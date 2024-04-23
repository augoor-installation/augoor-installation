
## Create Augoor 2.0 cloak key
Augoor 2.0 encrypt sensitive data in PostgreSQL. It's mandatory to create a secret to generate the cloak key.

```bash
./utils/augoor20-secret/create-cloackkey-secret.sh $secret_name $k8s_augoor_namespace [Optional] $encryptionString
```


::: warning NOTE
$secret_name must be augoor-cloack-key, this param is open just for create multiple secrets on dev mode.
:::