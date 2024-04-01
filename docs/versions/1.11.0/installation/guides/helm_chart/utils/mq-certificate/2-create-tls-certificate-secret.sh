#!/bin/bash

usage="$(basename "$0") [-h] [-p local_path] [-n rabbitmq_namespace] -- generates both tls-secret and rabbitmq-ca secrets
used by RabbitMQ Operator to encrypt and decrypt the TLS communication.
Execute $(basename "$0") from the same directory in which both server.crt and server.key are located
Parameters:
        -h shows this help text
        -p local path in which the server.crt and server.key will be generated (default: ../../local)
        -n Kubernetes NamesSpace in which RabbitMQ is running (default: augoor-rabbit-mq)"
RABBIT_NAMESPACE="augoor-rabbit-mq"
LOCAL_PATH=../../local
while getopts ':hp:n:' option; do
  case "$option" in
    h) echo "$usage"
       exit
       ;;
    p) LOCAL_PATH=$OPTARG
       ;;
    n) RABBIT_NAMESPACE=$OPTARG
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

kubectl create secret tls tls-secret \
  --cert=${LOCAL_PATH}/server.crt \
  --key=${LOCAL_PATH}/server.key \
  -n $RABBIT_NAMESPACE
kubectl create secret generic rabbitmq-ca \
   --from-file=${LOCAL_PATH}/server.crt \
   -n $RABBIT_NAMESPACE
