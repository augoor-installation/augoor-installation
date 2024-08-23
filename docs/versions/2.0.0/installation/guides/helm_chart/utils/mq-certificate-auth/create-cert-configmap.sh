#!/bin/bash

usage="$(basename "$0") [-h] [-p local_path] [-n augoor_namespace] [-r] -- Imports the self-signed certificate inside the
default Java keystore (cacerts) and creates both cacerts and server.crt configmaps needed by Augoor services to be trust
in the self-signed certificate created in previous steps.
Java keytool binary needs to be installed
Execute $(basename "$0") from utils/mq-certificate-auth directory
Parameters:
        -h shows this help text
        -p local path in which the server.crt and server.key will be generated (default: ../../local)
        -n Kubernetes NamesSpace in which Augoor is running (default: augoor)
        -r Used only if SSL has been disabled for RabbitMQ, check global.queueTLS parameter"
AUGOOR_NAMESPACE="augoor"
LOCAL_PATH=../../local
SSL_ENABLED=true
while getopts ':hp:n:r' option; do
  case "$option" in
    h) echo "$usage"
       exit
       ;;
    p) LOCAL_PATH=$OPTARG
       ;;
    n) AUGOOR_NAMESPACE=$OPTARG
       ;;
    r) SSL_ENABLED=false
       ;;
    :) printf "missing argument for -%s\n" "$OPTARG" >&2
       echo "$usage" >&2
       exit 1
       ;;
   \?) printf "illegal option: -%s\n" "$OPTARG" >&2
       echo "$usage" >&2
       exit 1
       ;;
  esac
done
shift $((OPTIND - 1))

if ! [ -f ../../inputs/cacerts ]
then
  echo "../../inputs/cacerts could not been found. Please check that create-cert-configmap is been executed from
  utils/mq-certificate and/or inputs/cacerts files does exist"
  exit 2
fi

cp ../../inputs/cacerts $LOCAL_PATH/cacerts

if $SSL_ENABLED
then
  if ! command -v keytool &> /dev/null
  then
    echo "keytool could not been found, please install it before continue"
    exit 2
  fi

  keytool -import -trustcacerts -keystore $LOCAL_PATH/cacerts \
     -storepass changeit -noprompt -alias rabbit-mq-selfsigned -file $LOCAL_PATH/server.crt
fi

kubectl create configmap cacerts  --from-file $LOCAL_PATH/cacerts -n $AUGOOR_NAMESPACE
kubectl create configmap server.crt  --from-file $LOCAL_PATH/server.crt -n $AUGOOR_NAMESPACE
