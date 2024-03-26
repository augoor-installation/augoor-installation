---
outline: [2,3]
---
Augoor Installation Guide for OpenShift{.guide-set-title}

# Step 2. Preparing the infrastructure
## Introduction
In this step you will prepare the infrastructure components required to install and deploy Augoor.

## Architecture Diagram
![Components of AWS Installation](../../../../../../images/OpenShift.drawio.png)

## Create the GKE Cluster
Full documentation on:
  * [Deploy an app to a GKE cluster](https://cloud.google.com/kubernetes-engine/docs/deploy-app-cluster).
  * [gcloud container clusters create](https://cloud.google.com/sdk/gcloud/reference/container/clusters/create).
  * [Create and manage VPC networks](https://cloud.google.com/vpc/docs/create-modify-vpc-networks).

1. Enable Compute and GKE services in our current project
```bash
gcloud services enable compute.googleapis.com
gcloud services enable container.googleapis.com
```

2. Create a VPC
```bash
gcloud compute networks create $vpc --subnet-mode custom
```

3. Create subnets for Cluster nodes and pods
```bash
gcloud compute networks subnets create $snetcluster --network $vpc --range $snetclusterCIDR --region $region
```

4. To create GKS cluster execute and custom label for non-GPU node pool
::: warning NOTE
use `gcloud compute accelerator-types list` for checking in which zone nvidia-tesla-v100 is available
:::

```bash
gcloud container clusters create $clusterName \
--num-nodes=2 \
--enable-autoscaling \
--max-nodes=4 \
--min-nodes=2 \
--machine-type=e2-standard-4 \
--addons=HttpLoadBalancing \
--network=$vpc \
--subnetwork=$snetcluster \
--node-labels=cloud.google.com/gke-nodepool=$NON_GPU_NODEPOOL \
--location=$region \
--node-locations=$tesla_v100_available_zone \
--tags=$tags
```

5. To create a GPU node pool and its custom label
```bash
gcloud container node-pools create $GPU_NODEPOOL \
--cluster $clusterName \
--accelerator type=nvidia-tesla-v100,count=1,gpu-driver-version=latest \
--location $region \
--num-nodes=1 \
--enable-autoscaling \
--total-min-nodes=1 \
--total-max-nodes=2 \
--machine-type=n1-standard-8 \
--tags=$tags
```

6. Create the namespace for Augoor application
```bash
kubectl create namespace $AUGOOR_NAMESPACE
```

## Create a Pre-shared Certificate
Full documentation on:
  * [Use Google-managed SSL certificates](https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs).

1. Enable the Certificate Manager API 
```bash
gcloud services enable certificatemanager.googleapis.com
```

2. Create a certificate resource for the global external Application Load Balancer
::: warning NOTE
Check **Check global.googleCertificateName** from Step 4. Configuration
:::

```bash
gcloud compute ssl-certificates create $CERTIFICATE_NAME \
--description=$DESCRIPTION \
--certificate my-augoor.pem \
--private-key my-augoor.key
```

3. [Optional] Reserve a static external IP address

::: warning NOTE
Check **Check global.googleStaticIPName** from Step 4. Configuration
:::

```bash
gcloud compute addresses create $googleStaticIPName --global

# The IP is:
gcloud compute addresses describe $googleStaticIPName --global --format='get(address)'
```

## Enable the Cluster to Download the images
We have 2 options configure the installation to pull the images:

* [Pull direct from Augoor Container Registry](#create-a-secret-to-authenticate-the-cluster-to-augoor-container-registry) 
* [Upload to a private repository and pull from there](#upload-images-to-your-registry) 

### Create a Secret to authenticate the cluster to Augoor Container Registry
1. Create the pull images secret 
```bash
kubectl create secret docker-registry acr-secret \
    --namespace $augoorNamespace \
    --docker-server=$acrName.azurecr.io \
    --docker-username=$servicePrincipalId \
    --docker-password=$servicePrincipalPwd
```

### Upload images to your registry
<!--@include: ../parts/mirroring_docker_images.md-->


## Create NFS Endpoint in the network of the Cluster
Full documentation on:
  * [Create a Filestore instance by using the gcloud CLI](https://cloud.google.com/filestore/docs/create-instance-gcloud).
  * [Access Filestore instances with the Filestore CSI driver](https://cloud.google.com/filestore/docs/csi-driver).

1. Enable the Cloud Filestore API 
```bash
gcloud services enable file.googleapis.com
```

2. Enable the Filestore CSI driver on GKE cluster
```bash
gcloud container clusters update $clusterName \
--update-addons=GcpFilestoreCsiDriver=ENABLED \
--location=$region   
```

3. Create a Filestore instance
```bash 
gcloud filestore instances create $instanceID \
--location=$zone \
--tier=BASIC_HDD \
--file-share=name="${FILE_SHARE_NAME}",capacity=2TB \
--network=name="${vpc}",connect-mode="DIRECT_PEERING"
```

4. Create Augoor Directories Schema in the NFS
<!--@include: ../parts/directory_schema.md-->

## Create PostgreSQL Server
Augoor use a postgres database to store the list of projects, status, and user relations to create a database server for
it execute the following command, it creates a postgres database using GCP's [Cloud SQL for PostgreSQL](https://cloud.google.com/sql/postgresql) solution.

Full documentation on:
  * [Create and manage databases](https://cloud.google.com/sql/docs/postgres/create-manage-databases).
  * [Connect to Cloud SQL for PostgreSQL from Google Kubernetes Engine](https://cloud.google.com/sql/docs/postgres/connect-instance-kubernetes).

1. Enable the Cloud SQL Admin API and the Service Networking API services
```bash
gcloud services enable sqladmin.googleapis.com
gcloud services enable servicenetworking.googleapis.com
```

2. Allocate an IP range for a private services access connection
```bash
gcloud compute addresses create google-managed-services-$vpc \
--global \
--purpose=VPC_PEERING \
--prefix-length=16 \
--description="peering range for Google" \
--network=$vpc
```

3. Create the private services access connection
```bash
gcloud services vpc-peerings connect \
--service=servicenetworking.googleapis.com \
--ranges=google-managed-services-$vpc \
--network=$vpc
```

4. Create PostgreSQL instance with Private IP
```bash
gcloud sql instances create $instanceID \
--database-version=POSTGRES_13 \
--root-password=$instancePassword \
--edition=ENTERPRISE \
--tier=db-g1-small \
--region=$region \
--no-assign-ip \
--network=$vpc
```

5. Create a DataBase and the Admin user for Flyway
<!--@include: ../parts/create_db_user.md-->

6. [Only if `sonarqube.enabled = True`] Create a DataBase and its user for SonarQube application.
<!--@include: ../parts/create_db_user_sonar.md-->