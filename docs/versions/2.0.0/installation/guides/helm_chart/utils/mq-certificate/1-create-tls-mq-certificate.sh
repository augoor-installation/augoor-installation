#!/bin/bash

usage="$(basename "$0") [-h] [-p local_path] -- generates a self-signed certificate based on csr.conf and cert.conf
configuration files to be used to encrypt the communication between Augoor components and RabbitMQ.
Execute $(basename "$0") from the same directory in which both csr.conf and cert.conf are located
Parameters:
        -h shows this help text
        -p local path in which the server.crt and server.key will be generated (default: ../../local)"
LOCAL_PATH=../../local
while getopts ':hp:' option; do
  case "$option" in
    h) echo "$usage"
       exit
       ;;
    p) LOCAL_PATH=$OPTARG
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
[ ! -d $LOCAL_PATH ] && mkdir $LOCAL_PATH
openssl genrsa -out ${LOCAL_PATH}/server.key 2048
openssl req -new -key ${LOCAL_PATH}/server.key -out ${LOCAL_PATH}/server.csr -config csr.conf
openssl x509 -req \
    -in ${LOCAL_PATH}/server.csr \
    -signkey ${LOCAL_PATH}/server.key \
    -out ${LOCAL_PATH}/server.crt \
    -days 365 \
    -sha256 -extfile cert.conf