#!/bin/bash

usage="$(basename "$0") [-h] [-n rabbitmq_namespace] -- mounts the self-signed certificates inside RabbitMQ cluster by
patching the RabbitMQ Messaging Topology Operator
Parameters:
        -h shows this help text
        -n Kubernetes NamesSpace in which RabbitMQ is running (default: augoor-rabbit-mq)"
RABBIT_NAMESPACE="augoor-rabbit-mq"
while getopts ':hn:' option; do
  case "$option" in
    h) echo "$usage"
       exit
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

kubectl patch deployments rabbitmq-cluster-rabbitmq-messaging-topology-operator -n $RABBIT_NAMESPACE --patch "spec:
  template:
    spec:
      containers:
      - name: rabbitmq-cluster-operator
        volumeMounts:
        - mountPath: /etc/ssl/certs/rabbitmq-ca.crt
          name: rabbitmq-ca
          subPath: server.crt
      volumes:
      - name: rabbitmq-ca
        secret:
          defaultMode: 420
          secretName: rabbitmq-ca"