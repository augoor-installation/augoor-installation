```sql
CREATE ROLE sonar WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  ENCRYPTED PASSWORD '${global.sonarPassword}';

COMMENT ON ROLE sonar IS 'Sonarqube user';

CREATE DATABASE sonarqube
    WITH 
    OWNER = sonar
    ENCODING = 'UTF8';
```
::: warning NOTE
Check **global.sonarPassword** from Step 4. Configuration
:::