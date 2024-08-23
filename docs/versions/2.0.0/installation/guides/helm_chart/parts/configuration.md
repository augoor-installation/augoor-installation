
# Step 4. Configuration
In this step you will configure Augoor to your specific needs before proceding with its installation.

## Prerequisites
Augoor delegates the authentication and authorization to your version control system (VCS) provider e.g. Github.

In order to complete the configuration you will need to create and register an OAuth app with your VCS provider.

|Provider| Documentation|
|---|---|
|Azure| [CCreating an OAuth App](https://learn.microsoft.com/en-us/azure/devops/integrate/get-started/authentication/azure-devops-oauth?view=azure-devops)|
|Bitbucket| [Creating an OAuth App](https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/#Create-a-consumer)|
|Github| [Creating an OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)|
|GitLab| [Creating an OAuth App](https://docs.gitlab.com/ee/integration/oauth_provider.html#create-a-user-owned-application)|

Repository configuration examples:
* Azure
```yaml
  reposProviders:
    - name: azure
      url: "" # set url using this structure: https://dev.azure.com/{organization_name} where organization_name is provided by client.
      admins: username1,username2
#     defaultRole: only if admins is not present can be used to make every user by default admin with the value ROLE_ADMIN
#      gatekeepers: username1,username2  # Enable this field to set users with gatekeeper role.
      clientId: APP ID from Authorizations
      clientSecret: Client Secret from Authorizations
      userAttr: login
      clientName: Azure repos
      scope: vso.code,vso.project
      type: AZURE_REPOS
```
* Bitbucket
```yaml
  reposProviders:
    - name: bitbucket      
      url: "" # If not using custom url then it should be https://bitbucket.org
      admins: user1,user2
#      defaultRole: only if admins is not present can be used to make every user by default admin with the value ROLE_ADMIN      
#      gatekeepers: username1,username2  # Enable this field to set users with gatekeeper role.
      clientId: Client ID from OAuth Apps
      clientSecret: Secret from OAuth Apps
      userAttr: username
      clientName: BitBucket
      scope: "" # for bitbucket this field is empty
      type: BITBUCKET
```
* Github
```yaml
  reposProviders:
    - name: github
      url: "" # https://github.com but if the client is using github enterprise then set the url from global.customDomainProvider. 
      admins: user1,user2
#     defaultRole: only if admins is not present can be used to make every user by default admin with the value ROLE_ADMIN
#      gatekeepers: username1,username2  # Enable this field to set users with gatekeeper role.
      clientId: Client ID from OAuth Apps
      clientSecret: Client Secret from OAuth Apps
      userAttr: login
      clientName: GitHub
      scope: read:user,repo
      type: GITHUB
```
* Gitlab

```yaml
  reposProviders:
    - name: gitlab
      url: "https://gitlab.com" 
      admins: user1,user2
#      defaultRole: only if admins is not present can be used to make every user by default admin with the value ROLE_ADMIN      
#      gatekeepers: username1,username2  # Enable this field to set users with gatekeeper role.
      clientId: Application ID from Applications
      clientSecret: Client Secret from Secret field
      userAttr: username
      clientName: GitLab
      scope: read_user,read_api,read_repository
      type: GITLAB
```
If you want to add a GitLab self-managed repository:

```yaml
  reposProviders:
    - name: gitlab
      type: GITLAB
      url: "" # set value from global.customDomainProvider
      admins: user1,user2
#      defaultRole: only if admins is not present can be used to make every user by default admin with the value ROLE_ADMIN      
#      gatekeepers: username1,username2  # Enable this field to set users with gatekeeper role.
      clientId: Application ID from Applications
      clientSecret: Client Secret from Secret field
      userAttr: username
      clientName: GitLab
      scope: read_user,read_api,read_repository
```


## Configuration
You can configure Augoor by customizing parameters in the `custom_values.yaml` file which you need to create.

### Global parameters Section

| Parameter                      | Description                                                                               | Value                     |
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
| `global.queueTLSstring`        | Whether to use TLS to encrypt RabbitMQ or not using as values `"0"` or `"1"`              | `"1"`                     |
| `global.queueUser`             | User for RabbitMQ. Generated in the Configuration Steps                                   | `""`                      |
| `global.sonarUrl`              | URL used for SonarQube connection                                                         | `"http://sonarqube:9000/"` |
| `global.sonarUser`             | Admin user for SonarQube                                                                  | `admin`                   |
| `global.sonarPassword`         | Password for SonarQube Admin user. Sonar Default will be changed during helm install      | `""`                      |
| `global.vaultEnabled`          | Enable Vault                                                                              | `false`                   |
| `global.volumeRootPath`        | NFS Root Path for mounting the directories in Augoor container                            | `/augoor`                 |
| `global.volumeServer`          | NFS server to connect to                                                                  | `""`                      |
| `global.ScmDomainProvider`     | Pair values separated by `:`, where the first value is the repo provider and the second one is the hostname of the repo provider. It can be more than one pair defined, just separate it with a comma `,`. Repo Provider values supported: `"github"`,  `"gitlab"`,  `"azure"`,  `"bitbucket"`. Some examples: `"github:github.com"`, `"github:my-internal-repos.com"`, `"bitbucket:bitbucket.org,gitlab:gitlab.com"`| `""`                      |
| `global.sftpServer`            | SFTP server url to connect to (needed for download model binaries for inference)          | `""`                      |
| `global.sftpUser`              | SFTP user for connect to server                                                           | `""`                      |
| `global.sshKeyPath`            | Path of SSH key needed for connect to SFTP server                                         | `""`                      |


### SharedIngres parameters section (Only for AWS)

| Name                           | Description                                                                       | Value  |
|--------------------------------|-----------------------------------------------------------------------------------|--------|
| `sharedIngress.securityGroups` | comma separated list of AWS security Groups for the ALB. eg: [sg-####]            | `[]`   |
| `sharedIngress.subnets`        | comma separated list of AWS subnets id for the ALB. eg: [subnet-####,subnet-####] | `[]`   |

### Assistant Database parameters

Required Parameters

| Name                                  | Description                                                              | Value        |
|---------------------------------------|--------------------------------------------------------------------------|--------------|
| `assistantdatabase.reconnectionDelay` | Retries to re-connect to queue                                           | `"5"`        |
| `assistantdatabase.rabbitQueue`       | RabbitMQ queue name                                                      | `""`         |
| `assistantdatabase.getCommitDays`     | Amount of days to consider to extract Git metadata                       | `"2000"`     |


Optional Parameters, if set, will override the corresponding global.value:

| Name                                  | Description                                                               | Value  |
|---------------------------------------|---------------------------------------------------------------------------|--------|
| `assistantdatabase.enabled`           | Set to False for not deploying assistantdatabase service                  | `True` |
| `assistantdatabase.containerRegistry` | Global Docker image registry                                              | ``     |
| `assistantdatabase.volumeServer`      | NFS server to connect to                                                  | ``     |
| `assistantdatabase.volumeRootPath`    | NFS Root Path for mounting the directories in assistantdatabase container | ``     |

### Auth parameters section

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

### Context-assistant parameters

Optional Parameters, if set, will override the corresponding global.value:

| Name                        | Description                                                     | Value  |
|-----------------------------|-----------------------------------------------------------------|--------|
| `contextassistant.enabled`  | Set to False for not deploying Context service                  | `True` |
| `contextassistant.openAIKey`| Open AI API KEY is needed for the context-assistant to work     | `""`   |

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

| Name                              | Description                                                                                                                               | Value   |
|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `jobstarter.enabled`              | Set to False for not deploying Index service                                                                                              | `True`  |
| `jobstarter.containerRegistry`    | Global Docker image registry                                                                                                              | ``      |
| `jobstarter.maxReplicas`          | Maximum quantity of GPU instances to be created. Please check your GPU Node group configuration                                           | `"1"`   |
| `jobstarter.sleepBetweenEvaluation` | Seconds the job-starte will wait before getting a new message count of the Queue                                                          | `"30"`  |
| `jobstarter.serviceTriggerThershold` | Value limit to reach to trigger a model-inference job creation, with AVG metric: 1 or more messages will trigger a inference job creation | `"0"`   |
| `jobstarter.metric` | Metric used for calculate if a new job need to be created can be `"AVG"`,`"SPEED"`,`"MIN"`,`"MAX"`   | `"AVG"` |

### Model Inference parameters

Optional Parameters, if set, will override the corresponding global.value:

| Name                                  | Description                                                                                          | Value |
|---------------------------------------|------------------------------------------------------------------------------------------------------|-------|
| `modelinference.enabled`              | Set to False for not deploying Inference service                                                     |`True` |
| `modelinference.containerRegistry`    | Global Docker image registry                                                                         | ``    |
| `modelinference.environment`          | Environment for the deployment                                                                       | ``    |
| `modelinference.inactivityTimeout`    | Seconds the application will wait for new message in the queue before shutdown pod                   | `300` |

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

### Structure Indexer parameters

Optional Parameters, if set, will override the corresponding global.value:

| Name                                   | Description                                                | Value   |
|----------------------------------------|------------------------------------------------------------|---------|
| `structureindexer.enabled`             | Set to False for not deploying Structure Indexer service   | `True`  |
| `structureindexer.containerRegistry`   | Global Docker image registry                               | ``      |


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
| `ui.app.environmentVars.EXPERIMENTAL` | -- | `true` |

Optional Parameters, if set, will override the corresponding global.value:

| Name                   | Description                               | Value   |
|------------------------|-------------------------------------------|---------|
| `ui.enabled`           | Set to False for not deploying UI service | `True`  |
| `ui.containerRegistry` | Global Docker image registry              | ``      |

### Custom parameters value file example
```yaml
global:
  cloudProvider: aws
  nodeGroupCPU: Required node group for Non-GPU pods
  nodeGroupGPU: Required node group for GPU pods
  environment: prod
  containerRegistry: example.dkr.ecr.zone-id.amazonaws.com
  containerRepository: serenity
  certificateArn: A valid AWS arn certificate for the ingress alb
  queueServer: rabbitmq-cluster.rabbitmq-system.svc
  queueUser: plain user
  queuePass: plain password
  queuePort: 5671
  queueTLS: TRUE
  queueTLSstring: "1"
  queueVhost: augoor-vhost
  vaultEnabled: false
  volumeServer: example.efs.zone-id.amazonaws.com
  volumeRootPath: /augoor
  postgresqlServer: example.zone-id.rds.amazonaws.com
  postgresqlPort: 5432
  sonarUrl: "http://sonarqube:9000"
  sonarUser: admin
  sonarPassword: Sonar Admin password to be set after first installation
  cipherPassphrase: Some passphrase for encrypt messages between Auth and CodeProcessor
  appurl: Application url without the procotol. i.e. auggor.my-domain.com
  customDomainProvider: ""
  JWT_PUBLIC_KEY: Plain output from `openssl ec -in /tmp/my.key.pem -pubout`
  JWT_PRIVATE_KEY: Plain output from `openssl pkcs8 -topk8 -nocrypt -in /tmp/my.key.pem`

sharedIngress:
  securityGroups: List of security groups for Ingress. [sg-#####]
  subnets: List of subnets for Ingres. [subnet-####,subnet-######]

auth:
  flywayUser: PostgreSQL DB admin user
  flywayPassword: Password for Postgresql DB admin
  postgresqlPassword: Password for Postgresql Auth user
  reposProviders:
    - name: github
      url: ""
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

sonarqube:
  enabled: false
  postgresqlUser: SonarQube User
  postgresqlPassword: SonarQube Password

ui:
  app:
    environmentVars:
      EXPERIMENTAL: "true"
  mixPanelApiKey: T1
  gtmid: T2

```

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