#!/bin/bash
if [ $# -ne 2 ]; then
   echo "2 parameters required USERNAME and PASSWORD"
   exit 0
fi

USER_NAME=$1
PASSWORD=$2

kubectl create secret docker-registry acr-secret \
    --namespace augoor \
    --docker-server=augoor01.azurecr.io \
    --docker-username=${USER_NAME} \
    --docker-password=${PASSWORD}

echo "Secret acr-secret created for with the credencials to pull images from augoor01.azurecr.io"
