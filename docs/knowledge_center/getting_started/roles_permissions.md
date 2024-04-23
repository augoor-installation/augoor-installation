# Roles and permissions

**Regular user:** Regular Users can subscribe to any approved repository to:
- Access, explore, and visualize all processed and approved repos. (Admins and Gatekeepers need to approve the repos).
- Explore code and documentation in the Search panel.
- Navigate through directories, files, and symbols in the Browser.
- Graphically analyze codebases in Codemap.

**Gatekeeper:** A Gatekeeper performs all tasks a Regular user can, plus:

- Visualize and add private repositories within the user's domain, to which the user has access but have not been processed by Augoor (permissions taken from the GIT provider).
- Manually add public repositories and branches within the user's domain.
- Approve processed repositories to allow their visibility to Regular users (only those to which the user has access).

**Admin role:** An Admin can perform the same tasks as a Gatekeeper, plus enter the Admin panel, which means:

- Access to information related to all the repositories processed by Augoor (name of the repo, processing status, approval status, sync status). Information is limited for security compliance.
- Manage repository processing (including abortion).
- Set up synchronization with the original repository.

## Action-role matrix

| **Capability**                                                                                              | **Regular User** | **Gatekeeper** | **Admin** |
|-------------------------------------------------------------------------------------------------------------|------------------|----------------|-----------|
| Subscribe to any approved repo (Admins and Gatekeepers need to approve the repos)                           | ■                | ■              | ■         |
| Access, explore, and visualize all approved repos                                                           | ■                | ■              | ■         |
| Chat with our AI Assistant                                                                                  | ■                | ■              | ■         |
| Explore code and documentation in the Search panel                                                          | ■                | ■              | ■         |
| Navigate through directories, files, and symbols in the Browser                                             | ■                | ■              | ■         |
| Graphically analyze codebases and chat with our AI Assistant in Codemap                                     | ■                | ■              | ■         |
| Visualize and add private repositories within the user's domain to which the user has access but have not been processed by Augoor (permissions taken from the GIT provider). |                  | ■              | ■         |
| Manually add public repositories and branches within the user's domain                                      |                  | ■              | ■         |
| Approve processed repositories to allow their visibility to Regular Users (only those to which the user has access) |                  | ■              | ■         |
| Access to information related to all the repositories processed by Augoor (name of the repo, processing status, approval status, sync status). Information is limited for security compliance |                  |                | ■         |
| Manage repository processing (including Abortion)                                                           |                  |                | ■         |
| Set up synchronization with the original repository                                                         |                  |                | ■         |


::: info Note
The Admin and Gatekeeper roles are established during the installation phase. Augoor, integrated with the Source Code Management (SCM), cannot be restricted directly. As a Regular User, your access is determined by the permissions granted within the SCM. However, access to repositories and data is governed by technical constraints, such as using a private network and the access restrictions imposed by the GIT provider.
:::
