---
outline: [2,3]
---
Augoor Docker Compose Installation Guide for Amazon Linux 2023{.guide-set-title}

# Step 2. Preparing the EC2 instance
In this step you will configure the EC2 instance where you will later configure and install Augoor.

## Connect via SSH
Connect to the EC2 instance created in the previous step via SSH or Session Manager and follow the instruction below.

## Download Augoor Installer
Download the Augoor installer from Augoor's S3:
```bash
wget https://augoor-docker-installer.s3.us-east-2.amazonaws.com/augoor_docker_install_9.1.zip
```
Unzip the augoor_docker_install.zip file:
```bash
unzip augoor_docker_install_9.1.zip
```

## Install the GPU Drivers
  
1. Install extra modeules
```bash
sudo dnf install kernel-modules-extra
```
2. Install gcc and make, if they are not already installed.
```bash
sudo yum install gcc make
```
3. Update your package cache and get the package updates for your instance
```bash
sudo yum update -y
```
4. Reboot your instance to load the latest kernel version.
```bash
sudo reboot
```
5. Run the following script to install the AWS GPU
```bash
bash install_aws_gpu.sh
```
6. Reboot your instance
```bash
sudo reboot
```
7. Test the driver is functioning correctly
```bash
nvidia-smi
```
The expected result is as follows:
```bash
Thu Nov 16 01:36:43 2023
+---------------------------------------------------------------------------------------+
| NVIDIA-SMI 535.129.03             Driver Version: 535.129.03   CUDA Version: 12.2     |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
|                                         |                      |               MIG M. |
|=========================================+======================+======================|
|   0  NVIDIA A10G                    On  | 00000000:00:1E.0 Off |                    0 |
|  0%   16C    P8              15W / 300W |      2MiB / 23028MiB |      0%      Default |
|                                         |                      |                  N/A |
+-----------------------------------------+----------------------+----------------------+

+---------------------------------------------------------------------------------------+
| Processes:                                                                            |
|  GPU   GI   CI        PID   Type   Process name                            GPU Memory |
|        ID   ID                                                             Usage      |
|=======================================================================================|
|  No running processes found                                                           |
+---------------------------------------------------------------------------------------+

```

## Install the Nvidia extension for docker
1. Configure the repository:
```bash
    curl -s -L https://nvidia.github.io/libnvidia-container/stable/rpm/nvidia-container-toolkit.repo | \
    sudo tee /etc/yum.repos.d/nvidia-container-toolkit.repo
```

2. Install the NVIDIA Container Toolkit packages:
```bash
sudo yum install -y nvidia-container-toolkit
```


## Install Docker version 24.0.5 or higher
1. Update AL2023 Packages
```bash
sudo dnf update
```

2. Installing Docker on Amazon Linux 2023
```bash
sudo dnf install docker
```

3. Start and Enable its Service
```bash
sudo systemctl start docker
```
```bash
sudo systemctl enable docker
```
4. Check and confirm the service is running absolutely fine
```bash
sudo systemctl status docker
```
5. Allow docker to run without sudo
```bash
sudo usermod -aG docker $USER
```
6. Apply the changes we have done to Docker Group
```bash
newgrp docker
```
7. Check if the Docker was installed correctly.

Run the following command.
```bash
  docker -v
```

## Install Docker Compose version 2.22.0 or higher

1. Download and install Compose
```bash
sudo curl -SL https://github.com/docker/compose/releases/download/v2.22.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
```

2. Create a symbolic link
```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

3. Allow Compose to run without sudo
```bash
sudo chmod +x /usr/local/bin/docker-compose
```

4. Check if the Compose was installed correctly
```bash
  docker-compose -v
```

## Install Git version 2.40.1 or higher
```bash
sudo yum install git
```

## Install Java for Keytool version 19.0.2 or higher
```bash
sudo yum install java
```
