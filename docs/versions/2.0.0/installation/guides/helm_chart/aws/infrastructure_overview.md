---
outline: [2,3]
---
Augoor Installation Guide for Amazon Web Services{.guide-set-title}

# Step 1. Infrastructure overview
## Introduction
In this step, you will be given an overview of the configuration required to install and deploy Augoor.

The necessary infrastructure to deploy Augoor includes:

* A EKS Cluster.
* AutoScaling enabled in the cluster.
* NFS storage.
* A PostgreSQL database instance.
* An Load Balancer Controller routing traffic to the Augoor Cluster.
* An assigned subdomain within your DNS.
* An SSL certicate for the Augoor subdomain.

## Create a EKS Cluster
Prepare an EKS Cluster for Augoor installation. The cluster must have two node groups with the following specifications.

### General services node group

|Specification| Value |
|---|---|
|Nodes|1~2|
|AWS Instance Type|t3.xlarge|
|CPU / Memory|4 / 16 GiB|
|Root Disk|120 GiB EBS|

### Augoor service node group

|Specification| Value |
|---|---|
|Nodes|1~3|
|AWS Instance Type|t3.2xlarge|
|CPU / Memory|8 / 32 GiB|
|Root Disk|120 GiB EBS|

### GPU node group

|Specification| Value |
|---|---|
|Nodes|Min = 0 / Max >= 1|
|AWS Instance Type|p3.8xlarge (v100)|
|CPU / Memory|32 / 244 GiB|
|GPU / Memory|4 / 64 GiB|
|Root Disk|180 GiB EBS|

**or**

|Specification| Value |
|---|---|
|Nodes|Min = 0 / Max >= 1|
|AWS Instance Type|g4dn.12xlarge (T4)|
|CPU / Memory|48 / 192 GiB|
|GPU / Memory|4 / 64 GiB|
|Root Disk|180 GiB EBS|

::: tip For GPU support, we need: 
* [Amazon EKS optimized accelerated AMI](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html#gpu-ami)
* [AWS Cluster Autoscaler](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/README.md).
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

## Create a EBS storage
Prepare a AWS EBS storage with the following specifications.

|Specification| Value |
|---|---|
|EBS|AWS EBS|
|Config|General Purpose/Elastic Throuput|
|Minimun Capacity|150 GiB|

## Create a NFS storage
Prepare a AWS EFS storage with the following specifications.

|Specification| Value |
|---|---|
|NFS|AWS EFS|
|Config|General Purpose/Elastic Throuput|
|Minimun Capacity|100 GiB|
|Network setting|0.5 GiB/s|


## Create a PostgreSQL Instance
Prepare a PostgreSQL RDS Instance with the following specifications.

|Specification| Value |
|---|---|
|RDS Instance Type|db.t3.micro|
|vCPU / Memory|2 / 1 GiB|
|Root Disk|50 GiB EBS|

## Configure Augoor subdomain and SSL certificate
Once you configure the augoor subdomain in your DNS e.g. `augoor.mycompany.com` and create the SSL certificate for that subdomain, you will need this certificate to the ALB.


::: tip Check that you've completed the following steps:
- Created an EKS Cluster with the correct specification, allowed incoming traffic to ports `4000`, `8080` and `8092`  and allowed outgoing traffic to the internet to download docker images (alternativelly allowed traffic to your internal artefact repository).
- Configured a subdomain and created a SSL certificate for it
- Configured an AWS Load Balancer Controller to route traffic to port `8080` in the nodes and assigned the SSL certificate
:::
