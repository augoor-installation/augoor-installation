
If your security policies will not allow the installer to pull Augoor Docker images from Augoor's public registry, you will need to mirror those images on your private registry.

The following snippet provides you the URLs for all the images you will need to install Augoor.



``` bash
augoor.azurecr.io/serenity/alpine:3.17.3
augoor.azurecr.io/serenity/auth:v0.10.2
augoor.azurecr.io/serenity/code-processor:v0.9.6-l2d-off-v2
augoor.azurecr.io/serenity/context:v2.1.2-hotfix9.1
augoor.azurecr.io/serenity/docker-frontend-proxy:v1.0.0
augoor.azurecr.io/serenity/docker-sync:v1.0.0
augoor.azurecr.io/serenity/forefront-proxy:v1.3.1
augoor.azurecr.io/serenity/indexer:v1.2.8-rsync-fix-2-memory-fix
augoor.azurecr.io/serenity/model-inference:v1.0.1-multitas-006
augoor.azurecr.io/serenity/model-services:v0.9.1
augoor.azurecr.io/serenity/node:16.17.0-alpine
augoor.azurecr.io/serenity/postgres:11
augoor.azurecr.io/serenity/rabbitmq:3-management
augoor.azurecr.io/serenity/rabbitmq:3-management
augoor.azurecr.io/serenity/search:v1.2.8-rsync-fix-2-memory-fix
augoor.azurecr.io/serenity/spider:v1.3.3-hotfix9.1-2
augoor.azurecr.io/serenity/structure-retrieval:0.4.0
augoor.azurecr.io/serenity/ui:v0.7.19-patch1
```