---
outline: [2,3]
---
Augoor Docker Compose Installation Guide for Amazon Linux 2{.guide-set-title}

# Step 1. Preparing the infrastructure
In this step you will prepare the infrastructure components required to install and deploy Augoor.

The necessary infrastructure to deploy Augoor includes:

* A dedicated EC2 instance where Augoor will be installed
* An Application Load Balancer (ALB) routing traffic to the Augoor instance
* An assigned subdomain within your DNS
* An SSL certicate for the Augoor subdomain

### Create the dedicated EC2 Instance
Prepare a dedicated EC2 instance where Augoor will be installed. This instance must meet the following specifications.

|Specification| Value |
|---|---|
|AWS Instance Type| g5.4xlarge|
|CPU / Memory|16 / 64 GiB|
|GPU / Memory|1 / 24 GiB|
|Root Disk|400 GiB EBS|
|Amazon MAchine Image (AMI)|Amazon Linux 2 AMI (HVM) 2.0.20231116.0 x86_64  kernel-5.10|
|Architecture|64-bits (X86)|


::: info Image information
The image mentioned can be used from QuickLaunch Page in AWS Console and located in the [AWS marketplace](https://aws.amazon.com/marketplace/pp/prodview-zc4x2k7vt6rpu?sr=0-6&ref_=beagle&applicationId=AWSMPContessa#pdp-overview)
:::

### Open communication ports
This instance needs to accept TCP traffic on port `3000`.

### Allow internet access
This instance needs internet access to download the required GPU drivers, the Augoor Docker Compose installer and, if needed, the required Augoor Docker images from the Augoor public registry, unless you are mirroring those images using your own private registry.

::: tip Alternative: Mirror Augoor Docker Images
<!--@include: ../parts/mirroring_docker_images.md-->
:::


### Instance EC2 Role
Create an EC2 Role that has the necessary permissions to download drivers from the relevant AWS bucket.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::ec2-linux-nvidia-drivers",
                "arn:aws:s3:::ec2-linux-nvidia-drivers/*"
            ]
        }
    ]
}
```


### Setup an AWS ALB
- The target group needs to forward traffic from port `443` to `3000` on the EC2 instance running Augoor
- Open communication in port `3000` from the ALB assigned to expose Augoor
- Assign a subdomain for Augoor in your DNS


### Configure Augoor subdomain and SSL certificate
Once you configure the augoor subdomain in your DNS e.g. `augoor.mycompany.com` and create the SSL certificate for that subdomain, you will need this certificate to the ALB.


::: tip Check that you've completed the following steps:
- Created an EC2 instance with the correct specification, allowed incoming traffic to port `3000` and allowed outgoing traffic to the internet to download drivers and docker images (alternativelly allowed traffic to your internal artefact repository).
- Created an EC2 Role that has the necessary permissions to download drivers from the relevant AWS bucket
- Configured a subdomain and created a SSL certificate for it
- Configured an AWS ALB to route traffic to port `3000` in the EC2 instance and assigned the SSL certificate
:::
