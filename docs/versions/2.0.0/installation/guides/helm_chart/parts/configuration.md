
# Step 3. Configuration
In this step you will configure Augoor to your specific needs before proceding with its installation.

## Prerequisites
Augoor delegates authentication and authorization to your version control system (VCS) provider, such as GitHub.

To complete the configuration, you will need to create and register an OAuth app with your VCS provider.

### Providers and Documentation for Creating an OAuth App

|Provider| Documentation|
|---|---|
|Azure| [Creating an OAuth App](https://learn.microsoft.com/en-us/azure/devops/integrate/get-started/authentication/azure-devops-oauth?view=azure-devops)|
|Bitbucket| [Creating an OAuth App](https://support.atlassian.com/bitbucket-cloud/docs/use-oauth-on-bitbucket-cloud/#Create-a-consumer)|
|Github| [Creating an OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)|
|GitLab| [Creating an OAuth App](https://docs.gitlab.com/ee/integration/oauth_provider.html#create-a-user-owned-application)|

### Configuring an SCM Provider in Augoor
To configure an SCM provider in Augoor, follow these steps:

### Step 1: Create `scm_config` in JSON Format

Below are the configuration examples for each supported SCM:

#### Example for GitHub
```json
  {
    "hosting_service_providers": [
      {
        "type": "github",
        "url": "https://github.com",
        "api_url": "https://api.github.com",
        "client_id": "0ovsd546sdfgh54cvbwt46",
        "client_secret": "45wersdfgfh4225sdferhgfsvsdfdalwjen,me",
        "redirect_uri": "https://my.domain.com/auth/github/callback",
        "client_name": "Github"
      }
    ],
    "admin_users": [    
      {
          "email": "mail.user1@my.domain.com",
          "hosting_service_type": "github"
      } ,
      {
          "email": "mail.user2@my.domain.com",
          "hosting_service_type": "github"
      }      
    ],
    "gatekeeper_users": [    
      {
          "email": "mail.user1@my.domain.com",
          "hosting_service_type": "github"
      },
      {
          "email": "mail.user2@my.domain.com",
          "hosting_service_type": "github"
      }      
    ]
  }
```
#### Example for Gitlab
```json
  {
    "hosting_service_providers": [
      {
        "type": "gitlab",
        "url": "https://gitlab.com",
        "api_url": "https://gitlab.com/api/v4",
        "client_id": "e03590d3bd986c8cf6f3536297d797f0acc50ec4a211e0e4594127200a5b",
        "client_secret": "dgtr-c8d86ad74e60f246e8db947e820ea9af50a8be3804531260d88bd057c4",
        "redirect_uri": "https://my.domain.com/auth/gitlab/callback",
        "client_name": "Gitlab"
      }
    ],
    "admin_users": [    
      {
          "email": "mail.user1@my.domain.com",
          "hosting_service_type": "gitlab"
      },
      {
          "email": "mail.user2@my.domain.com",
          "hosting_service_type": "gitlab"
      }       
    ],
    "gatekeeper_users": [    
      {
          "email": "mail.user1@my.domain.com",
          "hosting_service_type": "gitlab"
      },
      {
          "email": "mail.user2@my.domain.com",
          "hosting_service_type": "gitlab"
      }       
    ]
  }
```
#### Example for Bitbucket
```json
  {
    "hosting_service_providers": [
      {
        "type": "bitbucket",
        "url": "https://bitbucket.org",
        "api_url": "https://api.bitbucket.org/2.0",
        "client_id": "Qg4cYfrEUuVJtFd55tQ",
        "client_secret": "ayt5CcqjsYDXaloe56JQMayUfrSxwJXGu",
        "redirect_uri": "https://my.domain.com/auth/bitbucket/callback",
        "client_name": "Bitbucket"
      }
    ],
    "admin_users": [    
      {
          "email": "mail.user1@my.domain.com",
          "hosting_service_type": "bitbucket"
      },
      {
          "email": "mail.user2@my.domain.com",
          "hosting_service_type": "bitbucket"
      }       
    ],
    "gatekeeper_users": [    
      {
          "email": "mail.user1@my.domain.com",
          "hosting_service_type": "bitbucket"
      },
      {
          "email": "mail.user2@my.domain.com",
          "hosting_service_type": "bitbucket"
      }       
    ]
  }
```
#### Example for Azure
```json
  {
    "hosting_service_providers": [
      {
        "type": "azure",
        "url": "https://app.vssps.visualstudio.com",
        "api_url": "https://dev.azure.com/augoor",
        "oauth_url": "https://app.vssps.visualstudio.com",
        "client_id": "2RT283-G453-R89S-9B7C-2355E7A960",
        "client_secret": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJjaWQiOiIyODc5YTI4My0xZWI0LTQ3ZWQtOWI3Yy0yNDEzNT2E5NjAiLCJjc2kiOiJmZjg4YmQzMS1jYzhmLTRiZjYtYjhhYi0xYmZmMGEyY2VjZTkiLCJuYW1laWQiOiI5OTEwYjNlNi00MWMzLTZkMjMtOWEzOC1hYWJjMzAyOGQwOWIiiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwiYXVkIjoiYXBwLnZzdG9rZW4udmlzdWFsc3R1ZGlvLmNvbSIsIm5iZiI6MTcyNTA0OTEyNCwiZXhwIjoxODgyODE1NTI0fQ.NgJI4wrizP6rIRAAxBY6OCiRBDtdoSM7p2MlvAWd4o-gSvC3g_et1LckGh-aRAfrYIzuSsfEskCnx1sY8k8JStZloUHhZ1aIgD4k5adFmuVkT1qHSe5smHoWkRIreQYiFX8RDlF0K0rMfwk-AH-PC3EUaDKccBi5SqTeHC1xL7Cahmm9fYZlg4KrTUctSDbiqhP0Sv8-l7IOsZA03DgOU8MWewvqbn-momkZK9ekvFAkQypRbh40D_baG_yEa1kgrmlHi7HTT6ssFaZQdAX73cr0FfEcIG8e5z1Ch6dzCjcymCSDULAEZAtxLtTwoBNYK8bOPpg",
        "redirect_uri": "https://my.domain.com/auth/azure/callback",
        "client_name": "Azure"
      }
    ],
    "admin_users": [    
      {
          "email": "mail.user1@my.domain.com",
          "hosting_service_type": "azure"
      },
      {
          "email": "mail.user2@my.domain.com",
          "hosting_service_type": "azure"
      }       
    ],
    "gatekeeper_users": [    
      {
          "email": "mail.user1@my.domain.com",
          "hosting_service_type": "azure"
      },
      {
          "email": "mail.user2@my.domain.com",
          "hosting_service_type": "azure"
      }       
    ]
  }
```

::: warning User Types in Augoor

Augoor has three user types:

1. **Admin users:** Users with administrative privileges. 
2. **Gatekeeper users:** Users with permissions to act as intermediaries or gatekeepers.
3. **Users:** Regular users that are automatically created upon logging in to Augoor.

In the SCM configuration, you can add both admin and gatekeeper users. Regular users are created by default when they log in to Augoor.

:::

### Step 2: Convert `scm_config` to Base64
To encode the **`scm_config`** JSON content to Base64, which is required for the next configuration step, use one of the following methods based on your operating system or preference.

#### On Windows (Using PowerShell):

```powershell
$Content = Get-Content -Path 'path_to_your_file.json' -Raw
$Bytes = [System.Text.Encoding]::UTF8.GetBytes($Content)
$EncodedText = [Convert]::ToBase64String($Bytes)
$EncodedText | Set-Clipboard
```

This will copy the Base64 encoded content to your clipboard.

#### On macOS and Linux:
```bash
base64 path_to_your_file.json
```

To copy the output directly to the clipboard:

For macOS:
```bash
base64 path_to_your_file.json | pbcopy
```

For Linux (with xclip):
```bash
base64 path_to_your_file.json | xclip -selection clipboard
```

For Linux (with xsel):
```bash
base64 path_to_your_file.json | xsel --clipboard --input
```

## Configuration
You can configure Augoor by customizing parameters in the `custom_values.yaml` file which you need to create.

### Global parameters Section

| Parameter                      | Description                                                                               | Value                     |
|--------------------------------|-------------------------------------------------------------------------------------------|---------------------------|
| `global.appEnv`                |                                                                                           | `"augoor20"`              |
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
| `global.environment`           | Environment for the deployment                                                            | `prod`                    |
| `global.nodeGroupCPU`          | Kubernetes Node group for general services. *Not needed for OpenShift*                    | `""`                      |
| `global.nodeGroupGPUModelApi`  | Kubernetes Node group with GPU. *Not needed for OpenShift*                                | `""`                      |
| `global.nodeGroupAugoor`       | Kubernetes Node group for Augoor 2.0 service                                              | `""`                      |
| `global.postgresqlServer`      | PostgreSQL server to connect to                                                           | `""`                      |
| `global.postgresqlPort`        | Port to connect to PostgreSQL server                                                      | `5432`                    |
| `global.volumeRootPath`        | NFS Root Path for mounting the directories in Augoor container                            | `/augoor`                 |
| `global.volumeServer`          | NFS server to connect to                                                                  | `""`                      |
| `global.fileSystemId`          | NFS server file system ID                                                                 | `""`                      |
| `global.accessPoint`           | NFS server access point                                                                   | `""`                      |
| `global.sftpServer`            | SFTP server url to connect to (needed for download model binaries for inference)          | `""`                      |
| `global.sftpUser`              | SFTP user for connect to server                                                           | `""`                      |
| `global.sftpkey`               | Path of SSH key needed for connect to SFTP server                                         | `""`                      |
| `global.vllmModelID`           | this is the model name used for vllm model deployment. It should be the same one used by augoor20.modelName if augoor20.augoorModelBackend is equal to com.augoor.vllm.                                                   | `"default"`               |
| `global.vllmModelVersion`      | Model version                                                                             | `""`                      |


### SharedIngres parameters section (Only for AWS)

| Name                           | Description                                                                       | Value  |
|--------------------------------|-----------------------------------------------------------------------------------|--------|
| `sharedIngress.securityGroups` | comma separated list of AWS security Groups for the ALB. eg: [sg-####]            | `[]`   |
| `sharedIngress.subnets`        | comma separated list of AWS subnets id for the ALB. eg: [subnet-####,subnet-####] | `[]`   |


### Augoor20 parameters section

Required Parameters:

| Name                              | Description                                                                             | Value  |
|-----------------------------------|-----------------------------------------------------------------------------------------|--------|
| `augoor20.postgresqlUser`         | PostgreSQL DB admin user.                                                               | `""`   |
| `augoor20.postgresqlPassword`     | Password for the PostgreSQL DB admin user                                               | `""`   |
| `augoor20.postgresqlDatabase`     | Name of default database                                                                | `""`   |
| `augoor20.augoorAcjwtTtlSec`      |  | `1800`   |
| `augoor20.augoorModelBackend`     |  | `com.augoor.vllm`   |
| `augoor20.modelName`              | Is the model used to generate documentation. It should be available in prompts library | `"default"` |
| `augoor20.openaiApiKey`           | key api token used by llm service provider. It can be generated by openai or genexus saia. | `""`   |
| `augoor20.jokenSigner`            | This variable represents a json encoded in base64 with scm providers configuration. Refer to README for json format.  | `""`   |
| `augoor20.secretKeyBase`          | A secret key used as a base to generate secrets for encrypting and signing data. This is used by phoenix. | `""`   |
| `augoor20.augoorScmConfig`        | A key configuration for the signing using Joken library. | `""`   |

Optional Parameters, if set, will override the corresponding global.value:

| Name                     | Description                                 | Value  |
|--------------------------|---------------------------------------------|--------|
| `augoor20.enabled`           | Set to False for not deploying Auth service | `True` |


### Search parameters section

Optional Parameters, if set, will override the corresponding global.value:

| Name                       | Description                                                    | Value  |
|----------------------------|----------------------------------------------------------------|--------|
| `search.enabled`           | Set to False for not deploying Search service                  | `True` |

### Structure Indexer parameters section

Optional Parameters, if set, will override the corresponding global.value:

| Name                                   | Description                                                | Value   |
|----------------------------------------|------------------------------------------------------------|---------|
| `structureindexer.enabled`             | Set to False for not deploying Structure Indexer service   | `True`  |

### Structure Retrieval parameters section

Optional Parameters, if set, will override the corresponding global.value:

| Name                                   | Description                                                | Value   |
|----------------------------------------|------------------------------------------------------------|---------|
| `structureretrieval.enabled`           | Set to False for not deploying Structure Retrieval service | `True`  |

### UI parameters section

Required Parameters **IMPORTANT: For OpenShift Only**:

| Name                   | Description                                                           | Value  |
|------------------------|-----------------------------------------------------------------------|--------|
| `ui.app.environmentVars.EXPERIMENTAL` | -- | `true` |
| `ui.app.environmentVars.VISUAL_EXPLORER_PAGE` | -- | `1` |
| `ui.app.environmentVars.ENABLE_SAVED_VIEWS` | -- | `1` |

Optional Parameters, if set, will override the corresponding global.value:

| Name                   | Description                               | Value   |
|------------------------|-------------------------------------------|---------|
| `ui.enabled`           | Set to False for not deploying UI service | `True`  |
| `ui.containerRegistry` | Global Docker image registry              | ``      |

### Model Api parameters section
| Name                                       | Description           | Value   |
|--------------------------------------------|-----------------------|---------|
| `modelapi.internalIngressModelApi.enabled` | --                    | `false` |
| `modelapi.sharedIngress.securityGroups`    | --                    | `""`    |
| `modelapi.sharedIngress.subnets`           | --                    | `""`    |

Optional Parameters, if set, will override the corresponding global.value:

| Name                   | Description                                     | Value   |
|------------------------|-------------------------------------------------|---------|
| `modelapi.enabled`     | Set to False for not deploying modelapi service | `True`  |

### Custom parameters value file example
```yaml
global:
  appEnv: augoor20
  JWT_PRIVATE_KEY: MIGHAtygEAMBMGByqGSM49AgEGCCqGSM49AQPWJV
  JWT_PUBLIC_KEY: MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAELy+CsLtI8JUuKlqHAa8NbdgJfnmLAS8+o8sxR6SPTPE50Q5GEm0D1iVQ
  appurl: my.domain.com
  awsingressType: internet-facing
  certificateArn: arn:aws:acm:us-east-2:706132243688020:certificate/b2e7cbc8-32168b-419627-9cg543-95b7e774tg2e6e1
  cipherPassphrase: YTukRfte81*!mQTePLoa1w
  cloudProvider: aws
  containerRegistry: 4884161513556728.dkr.ecr.us-east-2.amazonaws.com
  containerRepository: serenity
  environment: prod
  jobCron: 0 0 0 * * *
  nodeGroupCPU: augoor-general
  nodeGroupGPUModelApi: p2.8xlarge-gpu
  nodeGroupAugoor: augoor20
  postgresqlPort: 5432
  postgresqlServer: augoor-rds-example.crobgr5q2.us-east-2.rds.amazonaws.com
  volumeRootPath: /
  volumeServer: fs-0c3b3051e1fb0.efs.us-east-2.amazonaws.com
  fileSystemId: fs-0c3b3051e14b0efb0
  accessPoint: fsap-06b51244516de6739
  sftpServer: models-prod-sftp.augoor.com
  sftpUser: augoor
  sftpkey: LS0tLS1CRUdJTiBPUEV0VVh3WkhnQmljdVJYdEJNTkJgUFJJVkFURSBLRVktLS0tLQo=
  vllmModelID: default
  vllmModelVersion: llama3_8b_instruct_v1.0.0
  vaultEnabled: false
sharedIngress:
  securityGroups: sg-0e264703584fb3, sg-0c2905a729e88 
  subnets: subnet-0d1b4da3ba6b4e, subnet-0fa02cf9b49bfdf, subnet-0724c3a1378 
ui:
  app:
    environmentVars:
      EXPERIMENTAL: "true"
      VISUAL_EXPLORER_PAGE: "1"
      ENABLE_SAVED_VIEWS: "1"
modelapi:
  enabled: true
  internalIngressModelApi:
    enabled: false
  sharedIngress:
    securityGroups: sg-0e264703584fb3, sg-0c2905a729e88 
  subnets: subnet-0d1b4da3ba6b4e, subnet-0fa02cf9b49bfdf, subnet-0724c3a1378
  ##sftpConfig:
  ##  forceDownload: "true"
augoor20:
  enabled: true
  postgresqlUser: "augoor_db_admin"
  postgresqlPassword: "aD2UWhUvYrkSs4D"
  postgresqlDatabase: "postgres"
  augoorAcjwtTtlSec: 1800
  augoorModelBackend: com.augoor.vllm
  modelName: default
  openaiApiKey: ""
  jokenSigner: s3cr3ts
  secretKeyBase: xAOq/OkvA8FWiQvCQs5yh7OYwipSavm3ABF0nndjEQVRjShYnO1fKmxa
  scmConfig: ewogICAgImhvc3Rpbmdfc2VydmljZV9wcm92aWRlcnMiOiBbCiAgICAgIHsKICAgICAgICAidHlwZSI6ICJnaXRodWIiLAogICAgICAgICJ1cmwiOiAiaHR0cHM6Ly9naXRodWIuY29tIiwKICAgICAgICAiYXBpX3VybCI6ICJodHRwczovL2FwaS5naXRodWIuY29tIiwKICAgICAgICAiY2xpZW50X2lkIjogIjBvdnNkNTQ2c2RmZ2g1NGN2Ynd0NDYiLAogICAgICAgICJjbGllbnRfc2VjcmV0IjogIjQ1d2Vyc2RmZ2ZCB7CiAgICAgICAgICAiZW1haWwiOiAibWFpbC51c2VyMkBteS5kb21haW4uY29tIiwKICAgICAgICAgICJob3N0aW5nX3NlcnZpY2VfdHlwZSI6ICJnaXRodWIiCiAgICAgIH0gICAgICAKICAgIF0KICB9
search:
  enabled: true
structureindexer:
  enabled: true
structureretrieval:
  enabled: true
bs:
  id: vol-0c16f730c228821
  zones:
    - us-east-2a
    - us-east-2b
    - us-east-2c

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