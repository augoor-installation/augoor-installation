#!/bin/bash

usage="$(basename "$0") [-h] [-n rabbitmq_namespace] [-r] -- mounts the self-signed certificates inside RabbitMQ cluster by
patching the RabbitMQ Messaging Topology Operator
Execute $(basename "$0") from utils/mq-create-objects directory
Parameters:
        -h shows this help text
        -n Kubernetes NamesSpace in which RabbitMQ is running (default: augoor-rabbit-mq)
        -r Used only if SSL has been disabled for RabbitMQ, check global.queueTLS parameter"
RABBIT_NAMESPACE="augoor-rabbit-mq"
SSL_ENABLED=true
while getopts ':hn:r' option; do
  case "$option" in
    h) echo "$usage"
       exit
       ;;
    n) RABBIT_NAMESPACE=$OPTARG
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

echo "Checking dependencies..."
if ! [ -d ../../dependencies ]
then
  echo "../../dependencies could not been found. Please check that create-objcts is been executed from
  utils/mq-create-objects and/or dependencies directory does exist"
  exit 2
fi
echo "Checking dependencies... PASS"

if $SSL_ENABLED
then
  kubectl apply -f ../../dependencies/mq-cluster.yaml -n $RABBIT_NAMESPACE
else
  kubectl apply -f ../../dependencies/mq-cluster_NOTLS.yaml -n $RABBIT_NAMESPACE
fi

kubectl apply -f ../../dependencies/vhost.yaml -n $RABBIT_NAMESPACE
kubectl apply -f ../../dependencies/user.yaml -n $RABBIT_NAMESPACE
kubectl apply -f ../../dependencies/queues.yaml -n $RABBIT_NAMESPACE
sleep 5
MQ_USER_NAME=$(kubectl get secret augoor-user-user-credentials -n $RABBIT_NAMESPACE -o jsonpath='{.data.username}' | base64 --decode)
cat  ../../dependencies/user-permissions.yaml | sed "s/\"\${MQ_USER_NAME}\"/${MQ_USER_NAME}/g" |  kubectl apply -n $RABBIT_NAMESPACE -f -
echo "MQ User created for Augoor is ${MQ_USER_NAME}"
