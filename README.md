# augoor-client-installation
Scripts to config and install Augoor System in clients, The objetive is provide installation over Kubernetes for AWS, Azure, and GCP Clouds 

[Overview of Augoor](https://augoor.ai)

## TL;DR

1. Create corresponding infrastructure as per provider
2. Install [RabbitMQ](./RabbitMQ.md) 
3. Create a file with all of your custom values in examples/my-values.yaml
4. Install the Helm Chart as follows

```console
cd helm
helm install my-release augoor . -f ../examples/my-values.yaml --namespace [augoor-k8s-namespace | augoor-openshift-project]
```

## Introduction

The installation does have 3 main stages:
  - Infrastructure Prerequisites
  - RabbitMQ installation
  - Service deployment

## Infrastructure Prerequisites

### Kubernetes or OpenShift Cluster

  - Node Group General services:
    
    | Provider | Type of instances | Quantity | Disk   | GPU Support |
    |----------|-------------------|----------|--------|-------------|
    | AWS      | t3.xlarge         | 2~3      | 120 GB | Not needed  |
    | Azure    | Standard_D3_v2    | 2~3      | 120 GB | Not needed  |
    | GCP      | e2-standard-4     | 2~3      | 120 GB | Not needed  |

  - Node Group with GPU (Elastic Scaling):
    
              
    | Provider | Type of instances                  |Scale Min | Scale Max | Disk   | GPU Support                                                                                                                                              |
    |----------|------------------------------------|-----|-----|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
    | AWS      | g5.4xlarge                         | 0   | >=1   | 180 GB | Needed: [Amazon EKS optimized accelerated AMI](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html#gpu-ami)                          |
    | Azure    | Standard_NC4as_T4_v                | 0   | >=1   | 180 GB | Needed: [AKS GPU image enabled](https://learn.microsoft.com/en-us/azure/aks/gpu-cluster)                                                                 |
    | GCP      | n1-standard-8 + 1 GPU NVIDIA V100  | 0   | >=1   | 180 GB | Needed: [Install NVIDIA GPU drivers automatically or manually](https://cloud.google.com/kubernetes-engine/docs/how-to/gpus#create-gpu-pool-auto-drivers) |


  - Additional requirement
    - The nodes need support for GPU, Azure, and GCP are included by default AWS requires GPU Optimized AMI.
    - The nodes need open communication in port 8080 from ALBs.
    - The nodes need open TCP communication between nodes.
    - The nodes need open TCP port 5432 communication with the postgres DB
    - AutoScaling ebnabled in the cluster.
      - for AWS [Cluster Autoscaler] (https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/README.md) Installed
      - for Azure [Enable Autoscaler] (https://learn.microsoft.com/en-us/azure/aks/cluster-autoscaler) in the cluster
    - NFS
      - In the case of AWS [EFS CSI Driver](https://github.com/kubernetes-sigs/aws-efs-csi-driver/blob/master/docs/README.md#installation) Installed
      - In the case of GCP [Filestore CSI Driver](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/filestore-csi-driver) Installed

### Storage

  - An NFS mount point in the following services:

    | Provider | Service            |  Gb/s |   Config                           |  
    |----------|--------------------|-------|------------------------------------|
    | AWS      | EFS                |  0.5  | General Purpose/Elastic Throuput   | 
    | Azure    | Storage Account    |  0.5  | File Storage/File Share NFS        | 
    | GCP      | Filestore instance |  0.5  |                                    | 

### Database

  - A PostgreSQL database in the following services:

    | Provider | Service        | Type          |
    |----------|----------------|---------------|
    | AWS      | RDS            | db.t3.micro   | 
    | Azure    | Azure Database | Standard_ND6s |
    | GCP      | Cloud SQL      | db-g1-small   |

  - [Database and user needed!!](./DB_USER.md)

### Others
   - [Rabbit MQ](./RabbitMQ.md)  Installed     

### Configuration steps as per provider

> IMPORTANT: This is a suggested infrastructure to create a PoC only, please check with your infrastructure team for Production environment

  - [AWS Installation](./AWS.md)
  - [Azure Installation](./Azure.md)
  - [GCP Installation](./GCP.md)
  - [Minikube Installation](./Minikube.md)
  - [OpenShift](./OpenShift.md)

## RabbitMQ installation

Please follow [RabbitMQ](./RabbitMQ.md) installation guide before to continue

## Service Deployment

Service deployment is being done by Augoor Helm Chart.
This chart bootstrap an [Augoor](https://augoor.ai) deployment on a [Kubernetes](https://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.
This chart bootstrap an [Augoor](https://augoor.ai) deployment on a [OpenShift](https://docs.openshift.com) cluster using the [Helm](https://helm.sh) package manager.


### RabbitMQ Check

1. Check Install RabbitMQ in the corresponding configuration for the provider
2. Make sure the following Secrets have been created in RABBIT_MQ Namespace:

   - rabbitmq-ca
   - tls-secret
3. Make sure the following Config Maps have been created in Augoor Namespace:

   - cacerts
   - server.crt

### Configure the required configuration for the new installation

1. The [Parameters](#parameters) section lists the parameters that should be configured during installation. In the examples/ directory you can find some common examples
2. After the creation of `examples/my-values.yaml` Augoor is ready to be install as follows:

### Installing the Chart

To install the chart with the release name `my-release`:
```console
cd helm
helm install my-release augoor -f ../examples/my-values.yaml --namespace [augoor-k8s-namespace | augoor-openshift-project]
```

### Uninstalling the Chart

To uninstall/delete the `my-release` deployment:
```console
helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Parameters

### Global parameters

| Name                           | Description                                                                               | Value                     |
|--------------------------------|-------------------------------------------------------------------------------------------|---------------------------|
| `global.JWT_PRIVATE_KEY`       | JSON WEB Tokens private key. See [JWT Configurarion](#jwt-configuration) section          | `""`                      |
| `global.JWT_PUBLIC_KEY`        | JSON WEB Tokens public key. See [JWT Configurarion](#jwt-configuration) section           | `""`                      |
| `global.appurl`                | Application URL's full domain only. i.e. auggor.my-domain.com                             | `""`                      |
| `global.cipherPassphrase`      | Some passphrase for encrypt messages between Auth and CodeProcessor                       | `""`                      |
| `global.certificateArn`        | Only for AWS. A valid ARN certificate for the ingress ALB                                 | `""`                      |
| `global.googleCertificateName` | Only for GCP. A valid certificate Name for the ingress ALB                                | `""`                      |
| `global.googleStaticIPName`    | Only for GCP. A valid reserverd IP Name for the ingress ALB                               | `""`                      |
| `global.cloudProvider`         | Cloud Provider. The value can be either of: aws, azure, gcp or minikube                   | `""`                      |
| `global.containerRegistry`     | Global Docker image registry                                                              | `""`                      |
| `global.containerRepository`   | Global Docker image repository, e.g: augoor.azurecr.io/$containerRepository/image:tag     | `"serenity"`              |
| `global.customDomainProvider`  | Needed if the Provider does have a custom domain instead of [github/gitlab/etc].com       | `""`                      |
| `global.environment`           | Environment for the deployment                                                            | `prod`                    |
| `global.nodeGroupCPU`          | Kubernetes Node group for general services. *Not needed for OpenShift*                    | `""`                      |
| `global.nodeGroupGPU`          | Kubernetes Node group with GPU. *Not needed for OpenShift*                                | `""`                      |
| `global.postgresqlServer`      | PostgreSQL server to connect to                                                           | `""`                      |
| `global.postgresqlPort`        | Port to connect to PostgreSQL server                                                      | `5432`                    |
| `global.queuePass`             | Password for the user above. Check `augoor-user-credentials` Secret in RabbitMQ Namespace | `""`                      |
| `global.queuePort`             | Port to connect to RabbitMQ service                                                       | `5671`                    |
| `global.queueServer`           | Deployed RabbitMQ service. eg: rabbitmq-cluster.rabbit-namespace.svc                      | `""`                      |
| `global.queueTLS`              | Whether to use TLS to encrypt RabbitMQ or not                                             | `true`                    |
| `global.queueUser`             | User for RabbitMQ. Generated in the Configuration Steps                                   | `""`                      |
| `global.sonarUrl`              | URL used for SonarQube connection                                                         | `"http://sonarqube:9000"` |
| `global.sonarPassword`         | Password for SonarQube Admin user. Sonar Default will be changed during helm install      | `""`                      |
| `global.sonarUser`             | Admin user for SonarQube                                                                  | `admin`                   |
| `global.vaultEnabled`          | Enable Vault                                                                              | `false`                   |
| `global.volumeRootPath`        | NFS Root Path for mounting the directories in Augoor container                            | `/augoor`                 |
| `global.volumeServer`          | NFS server to connect to                                                                  | `""`                      |

### SharedIngres parameters (Only for AWS)

| Name                           | Description                                                                       | Value  |
|--------------------------------|-----------------------------------------------------------------------------------|--------|
| `sharedIngress.securityGroups` | comma separated list of AWS security Groups for the ALB. eg: [sg-####]            | `[]`   |
| `sharedIngress.subnets`        | comma separated list of AWS subnets id for the ALB. eg: [subnet-####,subnet-####] | `[]`   |

### Auth parameters

Required Parameters:

| Name                      | Description                                                                             | Value  |
|---------------------------|-----------------------------------------------------------------------------------------|--------|
| `auth.flywayUser`         | PostgreSQL DB admin user.                                                               | `""`   |
| `auth.flywayPassword`     | Password for the PostgreSQL DB admin user                                               | `""`   |
| `auth.postgresqlPassword` | Password for `augooruser` PostgreSQL user                                               | `""`   |
| `auth.reposProvider`      | List of repositories to be used by Augoor. See [reposProvider](#repos-provider) section | `[]`   |

Optional Parameters, if set, will override the corresponding global.value:

| Name                     | Description                                 | Value  |
|--------------------------|---------------------------------------------|--------|
| `auth.enabled`           | Set to False for not deploying Auth service | `True` |
| `auth.environment`       | Environment for the deployment              | ``     |
| `auth.containerRegistry` | Global Docker image registry                | ``     |
| `auth.postgresqlServer`  | PostgreSQL server to connect to             | ``     |
| `auth.postgresqlPort`    | Port to connect to PostgreSQL server        | ``     |

### Codeprocessor parameters

Required Parameters:

| Name                               | Description                                                                            | Value  |
|------------------------------------|----------------------------------------------------------------------------------------|--------|
| `codeprocessor.foreFrontServer`    | ForeFront URL service                                                                  | `""`   |
| `codeprocessor.foreFrontApiKey`    | ForeFront API Key                                                                      | `""`   |

Optional Parameters, if set, will override the corresponding global.value:

| Name                              | Description                                                           | Value  |
|-----------------------------------|-----------------------------------------------------------------------|--------|
| `codeprocessor.enabled`           | Set to False for not deploying Code Processor service                 | `True` |
| `codeprocessor.containerRegistry` | Global Docker image registry                                          | ``     |
| `codeprocessor.volumeServer`      | NFS server to connect to                                              | ``     |
| `codeprocessor.volumeRootPath`    | NFS Root Path for mounting the directories in codeprocessor container | ``     |

### Context parameters

Optional Parameters, if set, will override the corresponding global.value:

| Name                        | Description                                                     | Value  |
|-----------------------------|-----------------------------------------------------------------|--------|
| `context.enabled`           | Set to False for not deploying Context service                  | `True` |
| `context.containerRegistry` | Global Docker image registry                                    | ``     |
| `context.volumeServer`      | NFS server to connect to                                        | ``     |
| `context.volumeRootPath`    | NFS Root Path for mounting the directories in context container | ``     |

### Forefront Proxy parameters

Optional Parameters, if set, will override the corresponding global.value:

| Name                               | Description                                  | Value  |
|------------------------------------|----------------------------------------------|--------|
| `forefrontproxy.enabled`           | Set to False for not deploying Index service | `True` |
| `forefrontproxy.containerRegistry` | Global Docker image registry                 | ``     |

### Indexer parameters

Optional Parameters, if set, will override the corresponding global.value:

| Name                        | Description                                                     | Value  |
|-----------------------------|-----------------------------------------------------------------|--------|
| `indexer.enabled`           | Set to False for not deploying Index service                    | `True` |
| `indexer.containerRegistry` | Global Docker image registry                                    | ``     |
| `indexer.volumeServer`      | NFS server to connect to                                        | ``     |
| `indexer.volumeRootPath`    | NFS Root Path for mounting the directories in indexer container | ``     |

### Job Starter parameters

Optional Parameters, if set, will override the corresponding global.value:

| Name                           | Description                                                                                     | Value  |
|--------------------------------|-------------------------------------------------------------------------------------------------|--------|
| `jobstarter.enabled`           | Set to False for not deploying Index service                                                    | `True` |
| `jobstarter.containerRegistry` | Global Docker image registry                                                                    | ``     |
| `jobstarter.maxReplicas`       | Maximum quantity of GPU instances to be created. Please check your GPU Node group configuration | `"1"`  |

### Model Inference parameters

Optional Parameters, if set, will override the corresponding global.value:

| Name                               | Description                                      | Value   |
|------------------------------------|--------------------------------------------------|---------|
| `modelinference.enabled`           | Set to False for not deploying Inference service | `True`  |
| `modelinference.containerRegistry` | Global Docker image registry                     | ``      |
| `modelinference.environment`       | Environment for the deployment                   | ``      |

### Model Services parameters

Optional Parameters, if set, will override the corresponding global.value:

| Name                              | Description                                           | Value   |
|-----------------------------------|-------------------------------------------------------|---------|
| `modelservices.enabled`           | Set to False for not deploying Model Services service | `True`  |
| `modelservices.containerRegistry` | Global Docker image registry                          | ``      |

### Search parameters

Optional Parameters, if set, will override the corresponding global.value:

| Name                       | Description                                                    | Value  |
|----------------------------|----------------------------------------------------------------|--------|
| `search.enabled`           | Set to False for not deploying Search service                  | `True` |
| `search.containerRegistry` | Global Docker image registry                                   | ``     |
| `search.volumeServer`      | NFS server to connect to                                       | ``     |
| `search.volumeRootPath`    | NFS Root Path for mounting the directories in search container | ``     |

### Semantic Conversation parameters

Optional Parameters, if set, will override the corresponding global.value:

| Name                                     | Description                                                    | Value  |
|------------------------------------------|----------------------------------------------------------------|--------|
| `semanticonversation.enabled`            | Set to False for not deploying Semantic Conversation service   | `True` |
| `semanticconversation.containerRegistry` | Global Docker image registry                                   | ``     |
| `search.volumeServer`                    | NFS server to connect to                                       | ``     |
| `search.volumeRootPath`                  | NFS Root Path for mounting the directories in search container | ``     |

### SonarQube parameters

Required Parameters:

| Name                           | Description                   | Value  |
|--------------------------------|-------------------------------|--------|
| `sonarqube.postgresqlUser`     | User for `sonarqube` database | `""`   |
| `sonarqube.postgresqlPassword` | Password for above user       | `""`   |


Optional Parameters, if set, will override the corresponding global.value:

| Name                          | Description                                           | Value   |
|-------------------------------|-------------------------------------------------------|---------|
| `sonarqube.enabled`           | Set to True for deploying SonarQube Community service | `False` |
| `sonarqube.environment`       | Environment for the deployment                        | ``      |
| `sonarqube.containerRegistry` | Global Docker image registry                          | ``      |
| `sonarqube.postgresqlServer`  | PostgreSQL server to connect to                       | ``      |
| `sonarqube.postgresqlPort`    | Port to connect to PostgreSQL server                  | ``      |

### Spider parameters

Optional Parameters, if set, will override the corresponding global.value:

| Name                       | Description                                                    | Value  |
|----------------------------|----------------------------------------------------------------|--------|
| `spider.enabled`           | Set to False for not deploying Spider service                  | `True` |
| `spider.containerRegistry` | Global Docker image registry                                   | ``     |
| `spider.volumeServer`      | NFS server to connect to                                       | ``     |
| `spider.volumeRootPath`    | NFS Root Path for mounting the directories in spider container | ``     |
| `spider.bitbucketToken`    | BitBucket personal token. Only used if Auth failed to get one  | ``     |
| `spider.azureToken`        | BitBucket personal token. Only used if Auth failed to get one  | ``     |
| `spider.githubComToken`    | BitBucket personal token. Only used if Auth failed to get one  | ``     |
| `spider.githubCorpToken`   | BitBucket personal token. Only used if Auth failed to get one  | ``     |

### Structure Retrieval parameters

Optional Parameters, if set, will override the corresponding global.value:

| Name                                   | Description                                                | Value   |
|----------------------------------------|------------------------------------------------------------|---------|
| `structureretrieval.enabled`           | Set to False for not deploying Structure Retrieval service | `True`  |
| `structureretrieval.containerRegistry` | Global Docker image registry                               | ``      |

### UI parameters

Required Parameters **IMPORTANT: For OpenShift Only**:

| Name                   | Description                                                           | Value  |
|------------------------|-----------------------------------------------------------------------|--------|
| `ui.useServiceAccount` | It will use the already generated `augoor-ui-sa` with root privileges | `true` |

Optional Parameters, if set, will override the corresponding global.value:

| Name                   | Description                               | Value   |
|------------------------|-------------------------------------------|---------|
| `ui.enabled`           | Set to False for not deploying UI service | `True`  |
| `ui.containerRegistry` | Global Docker image registry              | ``      |

## JWT Configuration

JSON Web Token (JWT) is an open standard [RFC 7519](https://tools.ietf.org/html/rfc7519) that defines a compact and
self-contained way for securely transmitting information between parties as a JSON object.

### Using ES256 algorithm
 
```bash
openssl ecparam -name secp256r1 -genkey -noout -out /tmp/my.key.pem

# Extracts PKCS8 private key
global.JWT_PRIVATE_KEY=`openssl pkcs8 -topk8 -nocrypt -in /tmp/my.key.pem`

# Extracts public key
global.JWT_PUBLIC_KEY=`openssl ec -in /tmp/my.key.pem -pubout`

rm /tmp/my.key.pem
```

## Repos Provider

Here you can have a list of repositories and their [OAuth 2.0](https://www.rfc-editor.org/rfc/rfc6749) attributes.
for instance:

if you want to add a GitHub repository:

```yaml
  reposProviders:
    - name: github
      url: "" # THIS FIELD NEEDS TO BE EMPTY
      admins: user1,user2
      clientId: Client ID from OAuth Apps
      clientSecret: Secret from OAuth Apps
      userAttr: login
      clientName: GitHub
      scope: read:user,repo
```

if you want to add an Azure repository:

```yaml
  reposProviders:
    - name: azure
      url: https://dev.azure.com/augoor
      admins: username1,username2
      clientId: APP ID from Authorizations
      clientSecret: Clien Secret from Authorizations
      userAttr: login
      clientName: Azure repos
      scope: vso.code,vso.project
```

And, of course, both repositories

```yaml
  reposProviders:
    - name: github
      url: "" # THIS FIELD NEEDS TO BE EMPTY
      admins: user1,user2
      clientId: Client ID from OAuth Apps
      clientSecret: Secret from OAuth Apps
      userAttr: login
      clientName: GitHub
      scope: read:user,repo
    - name: azure
      url: https://dev.azure.com/augoor
      admins: username1,username2
      clientId: APP ID from Authorizations
      clientSecret: Clien Secret from Authorizations
      userAttr: login
      clientName: Azure repos
      scope: vso.code,vso.project
```
  
if you want to add a GitLab SaaS repository:

```yaml
  reposProviders:
    - name: gitlab
      url: "" # THIS FIELD NEEDS TO BE EMPTY
      admins: user1,user2
      clientId: Application ID from Applications
      clientSecret: Clien Secret from Secret field
      userAttr: username
      clientName: GitLab
      scope: read_user,read_api,read_repository
```

if you want to add a GitLab self-managed repository:

```yaml
  reposProviders:
    - name: gitlab
      type: gitlab
      url: "" # THIS FIELD NEEDS TO BE EMPTY
      admins: user1,user2
      clientId: Application ID from Applications
      clientSecret: Clien Secret from Secret field
      userAttr: username
      clientName: GitLab
      scope: read_user,read_api,read_repository
```