
# Step 3. Configuration
In this step you will configure Augoor to your specific needs before proceding with its installation.

## Prerequisites
Augoor delegates the authentication and authorization to your version control system (VCS) provider e.g. Github.

In order to complete the configuration you will need to create and register an OAuth app with your VCS provider.

|Provider| Documentation|
|---|---|
|Github| [Creating and Oauth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)|

## Configuration
You configure Augoor by customising certain parameters found in the `.env` file

|Parameter|Description
|---|---|
| `containerRegistry` | Docker image registry. This will be used create the docker image URL with pattern $containerRegistry/$containerRepository/image:tag/.<br><br>_Example: "registry.mycompany.com"_<br>_Default: "augoor.azurecr.io"_
| `containerRepository`   | Docker image repository. This will be used create the docker image URL with pattern $containerRegistry/$containerRepository/image:tag <br><br>_Example: "serenity"_|
| `customDomainProvider`   | Needed if access to the VCS provider is via a custom domain instead of [github/gitlab/etc].com<br><br>_Examples: "github:github.com", "azure:dev.azure.com", "bitbucket:bitbucket.org" ,"gitlab:gitlab.com", "github:github.corp.globant.com"_|
| `appurl`| Application URL’s full domain only.<br><br>_Example: auggor.my-domain.com_
| `gh_url`| Example: "https://github.com" but if the client is using github enterprise then set the url from `global.customDomainProvider`.| `https://github.com`|
| `gh_client_name`| Name showed in the login screeen.<br><br>_Example:Augoor Docker_|
| `gh_client_id`| Client ID from OAuth Apps [more information here](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)<br><br>_Example: `sdfca0984r534`_|
| `gh_client_secret`      | Client Secret from OAuth Apps [more information here](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)<br><br>_Example: `dsfklñksd90843jklñsdaf90`|
| `gh_admins`             | Augoor admins users<br><br>_Example:`user1,user2`_             |

