::: warning NOTE
Check **global.volumeRootPath** from Step 4. Configuration
:::

```bash
mkdir -p ${global.volumeRootPath}/context/{admin,maps}
mkdir -p ${global.volumeRootPath}/{efs-spider,context-api-repositories,metadata,processed,repos,index,failed,models}

chown -R 1000:1000 ${global.volumeRootPath}
```