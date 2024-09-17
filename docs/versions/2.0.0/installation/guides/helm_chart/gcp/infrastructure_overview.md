---
outline: [2,3]
---
Augoor Installation Guide for Google Cloud Platform{.guide-set-title}

# Step 1. Infrastructure overview
## Introduction
In this step, you will be given an overview of the configuration required to install and deploy Augoor.

The necessary infrastructure to deploy Augoor includes:

* A GKE Cluster.
* AutoScaling enabled in the cluster.
* NFS Filestore instance.
* A PostgreSQL database instance.
* An Load Balancer Controller routing traffic to the Augoor Cluster.
* An assigned subdomain within your DNS.
* An SSL certicate for the Augoor subdomain.

## Create a GKE Cluster
Prepare an GKE Cluster for Augoor installation. The cluster must have two node groups with the following specifications.

### General services node group

|Specification| Value |
|---|---|
|Nodes|1~2|
|Instance Type|e2-standard-4|
|CPU / Memory|4 / 16 GiB|
|Root Disk|120 GiB |
### Augoor services node group

|Specification| Value |
|---|---|
|Nodes|1~2|
|Instance Type|e2-standard-4|
|CPU / Memory|8 / 32 GiB|
|Root Disk|120 GiB |

### GPU node group

|Specification| Value |
|---|---|
|Nodes|Min = 0 / Max >= 1|
|Instance Type|g2-standard-8 + 1 GPU NVIDIA TESLA V100|
|CPU / Memory|16 / 64 GiB|
|GPU / Memory|1 / 24 GiB|
|Root Disk|180 GiB EBS|

::: tip For GPU support, we need: 
* [Install NVIDIA GPU drivers automatically or manually](https://cloud.google.com/kubernetes-engine/docs/how-to/gpus#create-gpu-pool-auto-drivers)
:::

## Open communication ports
* The nodes needs to accept TCP traffic on ports `4000`, `8080` and `8092` from ALBs.
* The nodes need open TCP communication between nodes.
* The nodes need open TCP port 5432 communication with the PostgreSQL Database.

## Allow internet access
The nodes need internet access to download the required Augoor images from the Augoor public registry, unless you are mirroring those images using your own private registry.

::: tip Alternative: Mirror Augoor Images
<!--@include: ../parts/mirroring_docker_images.md-->
:::
## Create a Persistent Disk
Prepare a GCP Persistent Disk with the following specifications.

|Specification| Value |
|---|---|
|Persisten Disk|GCP Persisten Disk|
|Config|General Purpose/Elastic Throuput|
|Minimun Capacity|150 GiB|


## Create a EFS storage
Prepare a GCP Cloud Filestorage with the following specifications.

|Specification| Value |
|---|---|
|NFS|Cloud Filestore instance|
|Config|---|
|Minimun Capacity|100 GiB|
|Network setting|0.5 GiB/s|


## Create a PostgreSQL Instance
Prepare a PostgreSQL Azure Database Instance with the following specifications.

|Specification| Value |
|---|---|
|Cloud SQL Instance Type|db-g1-small |
|vCPU / Memory|Shared / 1.7 GiB|
|Root Disk|50 GiB EBS|

## Configure Augoor subdomain and SSL certificate
Once you configure the augoor subdomain in your DNS e.g. `augoor.mycompany.com` and create the SSL certificate for that subdomain, you will need this certificate to the ALB.


::: tip Check that you've completed the following steps:
- Created an GKE Cluster with the correct specification, allowed incoming traffic to ports `4000`, `8080` and `8092`  and allowed outgoing traffic to the internet to download docker images (alternativelly allowed traffic to your internal artefact repository).
- Configured a subdomain and created a SSL certificate for it
- Configured an AWS Load Balancer Controller to route traffic to port `8080` in the nodes and assigned the SSL certificate
:::
