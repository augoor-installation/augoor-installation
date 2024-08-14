
# Step 4. Installation
In this final step you will install Augoor and verify it is up and running.

## Login to the Docker Registry

To install Augoor, the first step is to login into your Docker registry.

To do this, you should use the following command:

```bash
# This is an example of login into AWS ecr.
export D_PASSWORD="your password"
echo $D_PASSWORD | docker login augoor.azurecr.io -u john --password-stdin
```
::: warning Registry
If you are using a private repository and mirrored the docker images from `augoor.azurecr.io`, run the previous command replacing `augoor.azurecr.io` with your container registry URL. This MUST be the same you've configured under the `containerRegistry` parameter in the [Configuration](/1.9.1/installation/guides/docker_compose/amazon_linux_2/configuration.html) step.
:::

## Run installation scripts

You have two ways to install Augoor:

### Option 1. When you SCM has an SSL Certificate signed by a public CA
This would be for example a certificate signed by github.com.

You must run the following script.

```bash
bash install_augoor.sh -i
```

### Option 2. When your SCM has a private SSL Certificate

1. Copy your CA to the `ssl` directoy (replace `my_ca.crt` for your private CA).

```bash
cp my_ca.crt ssl/server.crt
```

2. Install Augoor SSL as follows:

```bash
bash install_augoor.sh -s
```

## Verify the installation
To check if the services are up, you can use this command:

```bash
docker-compose ps
```

You can view a list of the installed services, which should total 16. Please refer to the list below.

| Service                  | Description                   | Version |
|--------------------------|-------------------------------|---------|
| sn_auth                  | Authentication Service        | v0.10.2 | 
| sn_code_processor        | Code Processor Service        | v0.9.6-l2d-off-v2 | 
| sn_context_api           | Context Api Service           | v2.1.2-hotfix9.1 |       
| sn_context_spider        | Context Spider Service        | v1.3.3-hotfix9.1-2 |     
| sn_forefront_proxy       | Fore Front Proxy Service      | v1.3.1 |    
| sn_frontend_proxy        | Frontend Proxy Service        | v1.0 |   
| sn_model_inference       | Model Inference Service       | v1.0.1-multitas-006 | 
| sn_model_services        | Model Service                 | v0.9.1| 
| sn_postgres              | Database Service              | v11 |
| sn_queue                 | RabbitMQ Queue Service        | rabbitmq:3-management|
| sn_semantic_conversation | Semantic Conversation Service | v0.6.12 |
| sn_structure_indexer     | Structure Indexer Service     | v0.3.0 |
| sn_structure_retrieval   | Structure Retrieval Service   | v0.4.0 |
| sn_ui                    | Frontend Service              | v0.7.19-patch1 |
| sn_zoekt_indexer         | Indexer Service               | v1.2.8-rsync-fix-2-memory-fix |
| sn_zoekt_search          | Search Service                | v1.2.8-rsync-fix-2-memory-fix |
| sn_zoekt_sync            | Sync Service                  | v1.0 |

::: tip CONGRATULATIONS
You've completed  Augoor installation. Navigate to your Augoor subdomain to start using it.
:::

