> **NOTE**: Check auth.flywayPassword from README.md

```sql
CREATE ROLE augoor_admin WITH
  LOGIN
  CREATEROLE
  ENCRYPTED PASSWORD '${auth.flywayPassword}';

COMMENT ON ROLE augoor_admin IS 'Flyway user';

GRANT augoor_admin to ${db_root_user};

CREATE DATABASE augoor
    WITH 
    OWNER = augoor_admin
    ENCODING = 'UTF8';
```