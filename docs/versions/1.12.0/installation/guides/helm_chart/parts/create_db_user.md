```sql
CREATE ROLE ${auth.flywayUser} WITH
  LOGIN
  CREATEROLE
  ENCRYPTED PASSWORD '${auth.flywayPassword}';

COMMENT ON ROLE ${auth.flywayUser} IS 'Flyway user';

GRANT ${auth.flywayUser} to ${db_root_user};

CREATE DATABASE augoor
    WITH 
    OWNER = ${auth.flywayUser}
    ENCODING = 'UTF8';
```

::: warning NOTE
Check **auth.flywayUser and auth.flywayPassword** from Step 4. Configuration
:::