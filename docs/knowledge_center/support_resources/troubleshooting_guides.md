# Troubleshooting

### **For Regular Users**

1. **Repository visibility (domain, permissions, availability)**
    - **Issue:** I do not see any or the repository I am looking for in the Manage Subscriptions list.
    - **Explanation:** You may not have access to the requested repository, or it has yet to be processed and approved.
    - **Solution:**
        - Ensure you are logged into Augoor with the correct provider account (GitHub, Azure, etc.).
        - Verify your access to the repository on GitHub with that account.
        - Consult your assigned Gatekeeper to check if the repository has been processed and approved.

2. **Branch visibility (selection when adding repositories)**
    - **Issue:** No branches are visible in the “Manage Subscriptions” branch column, or I cannot find the one I am looking for.
    - **Explanation:** The required branches have not been processed.
    - **Solution:** Request your assigned Gatekeeper to add the necessary branches.

3. **Repository and branch processing**
    - **Issue:** The processing of a repository or one of its branches has ended with an Error status.
    - **Explanation:** There may be a temporary issue with the service, affecting the processing.
    - **Solution:** Request your assigned Admin to reprocess the repository.

4. **Language support**
    - **Issue:** I cannot see any generated documentation for some of my files.
    - **Explanation:** We support documentation for specific languages. If your file is in a supported format, there may have been an issue during processing.
    - **Solution:** If it's a supported file, request your assigned Admin to reprocess the repository.
    - **Note:** Augoor supports Apex, Cobol, C#, Java, Javascript, Python, React, Typescript.

### **For Admins & Gatekeepers**

1. **Repository visibility (domain, permissions, availability)**
    - **Issue:** I do not see any or the repository I am looking for in the Manage Subscriptions list.
    - **Explanation:** You may not have access to the requested repository.
    - **Solution:**
        - Ensure you are logged into Augoor with the correct provider account.
        - Verify your access to the repository and application access on GitHub.

2. **Branch visibility (selection when adding repositories)**
    - **Issue:** No branches are visible in the “Manage Subscriptions” branch column, or I cannot find the one I am looking for.
    - **Explanation:** The required branches have not been processed.
    - **Solution:** Use the detailed subscription to subscribe and process the new branches.

3. **Repository and branch processing**
    - **Issue:** The processing of a repository or one of its branches has ended with an Error status.
    - **Explanation:** The processing service may be down or not completed successfully.
    - **Solution:** Check the status of the processing service and try processing the repository again.

4. **Repository name change**
    - **Issue:** The name of the original repository was changed and I still see the old name.
    - **Explanation:** Old and new names appear in different sections if the repository name changes after processing.
    - **Solution:** After the repository name change, go to Manage subscriptions, add the repository manually with the new URL, and reprocess the repository.
