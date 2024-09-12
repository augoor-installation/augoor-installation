### **Allow Use of PostgreSQL **`pgcrypto`** Extension on AWS RDS**
1. **Access RDS Service:**
    - Navigate to the RDS Service in your AWS Management Console.
    - Click on the **Parameter Groups** section.

2. **Select or Create a Parameter Group:**
    - In the parameter groups dashboard, select the parameter group associated with your Augoor database.

::: warning NOTE
Note: If you do not have a customized parameter group assigned to your database, please create a new one and assign it to your database.
:::

3. **Edit Parameter Group:**
    - Use the filter parameters box to search for **`rds.allowed_extensions`**.
    - In the parameter group section, click the **Edit** button.
    - In the value section, enter **`pgcrypto`** and click **Save Changes**.

### **Add PostgreSQL `pgcrypto` to Your Database**

1. **Connect to Your Database:**
    - Use your preferred method to connect to your PostgreSQL database.
    - Create the extension in the following databases: augoor and postgres
2. **Create the Extension:**
    - Run the following command to create the extension: