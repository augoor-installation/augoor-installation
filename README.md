[![Deploy VitePress site to Pages](https://github.com/augoor-installation/augoor-docker-installation/actions/workflows/deploy.yaml/badge.svg)](https://github.com/augoor-installation/augoor-docker-installation/actions/workflows/deploy.yaml)

# Augoor Docker Installation

This repository uses [Vitepress](https://vitepress.dev/) to build a static site containing the documentation guides for installing Augoor using Docker Compose.

Check the generated website at
[https://augoor-installation.github.io/augoor-docker-installation/](https://augoor-installation.github.io/augoor-docker-installation/).

## Requirements
* NodeJS
* yarn

## installing dependencies
Install the project dependencies

```bash
yarn install
```

## Running the local documentation server
When writing the documentation you can open a server that will dynamically render your changes to the Markdown files. The following command will run a server. Click on the provided link and a browser window will open the documentation homepage.
```bash
yarn docs:dev
```

This will start a web server printing the following in your terminal
```bash
vitepress v1.0.0-rc.31

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h to show help
```

Open the link to browse the documentation. You can edit the documentation and vitepress will automatically refresh your browser content.

## How to deploy

```bash
yarn docs:build
```
This will build the static website under `docs/.vitepress/dist`. Copy the contents to your web server to publish the website.

