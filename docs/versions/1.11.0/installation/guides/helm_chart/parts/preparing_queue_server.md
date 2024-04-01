# Step 3. Preparing queue server - Rabbit MQ
## Introduction
Augoor use Rabbit MQ as Bus to Communicate some components

## Use Helm chart to install Rabbit MQ

Full documentation on [Rabbit MQ Site](https://www.rabbitmq.com/kubernetes/operator/install-operator.html).

1. Using Bitnami helm chart
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
kubectl create namespace augoor-rabbit-mq
helm install rabbitmq-cluster bitnami/rabbitmq-cluster-operator -n augoor-rabbit-mq
```

## SSL Enabled

Use self signed certificates to patch rabbit-mq installation to enable SSL.

To create Self Signed Certificate personalize the templates, if needed
* **cert.conf**
```bash
<!--@include: ../utils/mq-certificate/cert.conf-->
```
* **csr.conf**
```bash
<!--@include: ../utils/mq-certificate/csr.conf-->
```




Execute the scripts in the folder [/utils/mq-certificate](https://github.com/augoor-installation/augoor-installation/tree/2a3d40a7a4c1bbf7039c90a96c9a510c04e0b03e/utils) in order to :
1. Create the certificates in local folder
   ```bash
   cd ./utils/mq-certificate
   bash 1-create-tls-mq-certificate.sh
   ```
2. Create a Secret in kubernetes that contains the certificates
   ```bash
   bash 2-create-tls-certificate-secret.sh
   ```
3. Patch the Rabbit MQ operator to use SSL using the certificates
   ```bash
   bash 3-patch-operator.sh
   ```

Create Config Map to mount the cacerts

1. Execute script [/utils/mq-certificate-auth/create-cert-configmap.sh](https://github.com/augoor-installation/augoor-installation/blob/2a3d40a7a4c1bbf7039c90a96c9a510c04e0b03e/utils/mq-certificate-auth/create-cert-configmap.sh) with the name of augoor kubernetes namespace as a parameter ($augoorNamespace)
::: warning NOTE
**Java keytool binary needs to be installed**
:::

```bash
cd ./utils/mq-certificate-auth
bash create-cert-configmap.sh -n $augoorNamespace
```

## SSL Disabled

::: warning NOTE
**SSL for RabbitMQ can be disabled by global.queueTLS parameter**
:::

Create Config Map needed by Augoor to start some pods

1. Execute script [/utils/mq-certificate-auth/create-cert-configmap.sh](https://github.com/augoor-installation/augoor-installation/blob/2a3d40a7a4c1bbf7039c90a96c9a510c04e0b03e/utils/mq-certificate-auth/create-cert-configmap.sh) with the name of augoor kubernetes namespace as a parameter ($augoorNamespace) and the option -o as follows

```bash
cd ./utils/mq-certificate-auth
mkdir ../../local
touch ../../local/{cacerts,server.crt}
bash create-cert-configmap.sh -n $augoorNamespace -r
```

## RabbitMQ objects

Objects to be created:

1. rabbitmq-cluster Cluster
2. augoor-vhost VHost
3. augoor-user User
4. The following queues:
   1. sn.context
   2. sn.repo
   3. sn.repo-status
   4. sn.spider
   5. sn.tag-tree
5. rabbit-user-1-permission Permission

### For Kubernetes installation
Execute the script [/utils/mq-create-objects/create-objects.sh](./utils/mq-create-objects/create-objects.sh)

   * SSL ENABLED
   ```bash
   cd ./utils/mq-create-objects
   bash create-objects.sh
   ```

   * SSL DISABLED
   ```bash
   cd ./utils/mq-create-objects
   bash create-objects.sh -r   
   ```

### For OpenShift installation
Execute the script [/utils/mq-create-objects/create-objects-openshift.sh](./utils/mq-create-objects/create-objects-openshift.sh)

   * SSL ENABLED
   ```bash
   cd ./utils/mq-create-objects
   bash create-objects-openshift.sh
   ```

   * SSL DISABLED
   ```bash
   cd ./utils/mq-create-objects
   bash create-objects-openshift.sh -r   
   ```
## Check RabitMQ Installation
### Check RabitMQ Objects [Optional]

comand to check MQ queues created
kubectl describe queues.rabbitmq.com context  -n augoor-rabbit-mq | grep Status -A 5

command to list queues in the augoor-rabbit-mq namespace:
kubectl get queues.rabbitmq.com  -n augoor-rabbit-mq

### Check RabbitMQ Cluster

```bash
kubectl get rabbitmqcluster.rabbitmq.com -n augoor-rabbit-mq
```
> Expected response:
>> ```
>> NAME              ALLREPLICASREADY  RECONCILESUCCESS  AGE 
>> rabbitmq-cluster  True              True              xx 
>> ```

### Check RabbitMQ Vhost

```bash
kubectl describe vhost.rabbitmq.com augoor-vhost -n augoor-rabbit-mq | grep Status -A 5
```
> Expected response:
>> ```
>> Status:
>>   Conditions:
>>     Last Transition Time:  YYYY-MM-DDTHH:MM:SSZ
>>     Reason:                SuccessfulCreateOrUpdate
>>     Status:                True
>>     Type:                  Ready
>>   Observed Generation:     1
>> Events:                    <none>
>> ```

### Check RabbitMQ User

```bash
kubectl describe user.rabbitmq.com augoor-user -n augoor-rabbit-mq | grep Status -A 5
```
> Expected response:
>> ```
>> Status:
>>   Conditions:
>>     Last Transition Time:  YYYY-MM-DDTHH:MM:SSZ
>>     Reason:                SuccessfulCreateOrUpdate
>>     Status:                True
>>     Type:                  Ready
>>   Credentials:
>>     Name:               augoor-user-user-credentials
>>   Observed Generation:  1
>>   Username:             ${Some_random_hash_value}
>> ```

### Check RabbitMQ Queues

```bash
kubectl describe queues.rabbitmq.com $queue_name -n augoor-rabbit-mq | grep Status -A 4
```
> Expected response per each Queue:
>> ```
>> Status:
>>   Conditions:
>>     Last Transition Time:  YYYY-MM-DDTHH:MM:SSZ
>>     Reason:                SuccessfulCreateOrUpdate
>>     Status:                True
>>     Type:                  Ready
>>   Observed Generation:     2
>> Events:                    <none>
>> ```

### Check RabbitMQ Permission

```bash
kubectl describe secrets/augoor-user-user-credentials -n augoor-rabbit-mq
```
> Expected response:
>> ```
>> Name:         augoor-user-user-credentials
>> Namespace:    augoor-rabbit-mq
>> Labels:       <none>
>> Annotations:  <none>
>> 
>> Type:  Opaque
>> 
>> Data
>> ====
>> password:  32 bytes
>> username:  32 bytes
>> ```

## Get RabbitMQ Username and Password

**global.queueUser**:
```bash
kubectl get secret augoor-user-user-credentials -n augoor-rabbit-mq -o jsonpath='{.data.username}' | base64 --decode
```

**global.queuePass**:
```bash
kubectl get secret augoor-user-user-credentials -n augoor-rabbit-mq -o jsonpath='{.data.password}' | base64 --decode
```