import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Augoor",
  base: "/",
  description: "Augoor Documentation Site",
  //Route rewrites
  rewrites: {
      'versions/:version/(.*)': ':version/(.*)'
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/', activeMatch: '' },      
      {
        text: 'Installation',
        items: [
          { text: 'Helm Chart', link: '/2.0.0/installation/guides/helm_chart/index' },
        ]
      },
      { text: 'Knowledge Center', link: '/knowledge_center/getting_started/index', activeMatch: '/knowledge_center/getting_started/' },
      {
        text: 'Old versions docs',
        items: [
          { text: 'Helm Chart 1.11.0', link: '/1.11.0/installation/guides/helm_chart/index' },
          { text: 'Docker Compose 1.9.1', link: '/1.9.1/installation/guides/docker_compose/index' },
        ]
      },
      { text: 'Augoor.ai', link: 'https://augoor.ai' },
      { text: 'Logout', link: 'https://helpcenter-dev.augoor.com/_identity/logout', target: '_self' },
    ],

    head : [],

    footer: {
      copyright: '© 2024 Augoor™ . All right reserved &nbsp;&nbsp; | &nbsp;&nbsp; <a href="https://www.augoor.ai/policies">Policies</a>'
    },

    lang: 'en-US',

    sidebar: sidebars(),

    lastUpdated: true,

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/augoor-installation/augoor-installation' }
    // ],

    markdown: {
      // toc: { level: [3] },
      // theme: 'one-dark-pro',
      lineNumbers: true,
      config: (md) => {
        md.use(require('markdown-it-task-lists', { enabled: true }))
      }
    }
  }
})


function sidebars() {
  return {
    '/1.9.1/installation/guides/docker_compose/amazon_linux_2/': docker_linux2_sidebar('1.9.1'),
    '/1.9.1/installation/guides/docker_compose/amazon_linux_2023/': docker_linux2023_sidebar('1.9.1'),
    '/1.11.0/installation/guides/helm_chart/aws/': aws_sidebar('1.11.0'),
    '/1.11.0/installation/guides/helm_chart/azure/': azure_sidebar('1.11.0'),
    '/1.11.0/installation/guides/helm_chart/gcp/': gcp_sidebar('1.11.0'),
    '/1.11.0/installation/guides/helm_chart/openshift/': openshift_sidebar('1.11.0'),
    '/2.0.0/installation/guides/helm_chart/aws/': aws_sidebar_2('2.0.0'),
    '/2.0.0/installation/guides/helm_chart/azure/': azure_sidebar_2('2.0.0'),
    '/2.0.0/installation/guides/helm_chart/gcp/': gcp_sidebar_2('2.0.0'),
    '/2.0.0/installation/guides/helm_chart/oci/': oci_sidebar_2('2.0.0'),
    '/2.0.0/installation/guides/helm_chart/openshift/': openshift_sidebar_2('2.0.0'),
    '/knowledge_center/getting_started': getting_started_sidebar(),
    '/knowledge_center/repository_management': getting_started_sidebar(),
    '/knowledge_center/code_search': getting_started_sidebar(),
    '/knowledge_center/code_documentation': getting_started_sidebar(),
    '/knowledge_center/code_visualization': getting_started_sidebar(),
    '/knowledge_center/code_navigation': getting_started_sidebar(),
    '/knowledge_center/code_assistant': getting_started_sidebar(),
    '/knowledge_center/security': getting_started_sidebar(),
    '/knowledge_center/support_resources': getting_started_sidebar()
  }
}

function docker_linux2_sidebar($version) {
  return [
     { text: 'Overview', link: '/'+$version+'/installation/guides/docker_compose/amazon_linux_2/' },
    {
      text: 'Steps',
      items: [
        { text: 'Step 1. Preparing the Infrastructure', link: '/'+$version+'/installation/guides/docker_compose/amazon_linux_2/preparing_infrastructure' },
        { text: 'Step 2. Preparing the EC2 instance', link: '/'+$version+'/installation/guides/docker_compose/amazon_linux_2/preparing_instance' },
        { text: 'Step 3. Configuration', link: '/'+$version+'/installation/guides/docker_compose/amazon_linux_2/configuration' },
        { text: 'Step 4. Installation', link: '/'+$version+'/installation/guides/docker_compose/amazon_linux_2/installation' },
      ]
    }
  ]
}

function docker_linux2023_sidebar($version) {
  return [
     { text: 'Overview', link: '/'+$version+'/installation/guides/docker_compose/amazon_linux_2023/' },
    {
      text: 'Steps',
      items: [
        { text: 'Step 1. Preparing the Infrastructure', link: '/'+$version+'/installation/guides/docker_compose/amazon_linux_2023/preparing_infrastructure' },
        { text: 'Step 2. Preparing the EC2 instance', link: '/'+$version+'/installation/guides/docker_compose/amazon_linux_2023/preparing_instance' },
        { text: 'Step 3. Configuration', link: '/'+$version+'/installation/guides/docker_compose/amazon_linux_2023/configuration' },
        { text: 'Step 4. Installation', link: '/'+$version+'/installation/guides/docker_compose/amazon_linux_2023/installation' },
      ]
    }
  ]
}

function aws_sidebar($version) {
  return [
     { text: 'Overview', link: '/'+$version+'/installation/guides/helm_chart/aws/' },
    {
      text: 'Steps',
      items: [
        { text: 'Step 1. Infrastructure Overview', link: '/'+$version+'/installation/guides/helm_chart/aws/infrastructure_overview' },
        { text: 'Step 2. Preparing the Infrastructure', link: '/'+$version+'/installation/guides/helm_chart/aws/preparing_infrastructure' },
        { text: 'Step 3. Preparing the Queue Server - Rabbit MQ', link: '/'+$version+'/installation/guides/helm_chart/aws/preparing_queue_server' },
        { text: 'Step 4. Configuration', link: '/'+$version+'/installation/guides/helm_chart/aws/configuration' },
        { text: 'Step 5. Installation', link: '/'+$version+'/installation/guides/helm_chart/aws/installation' },
      ]
    }
  ]
}

function aws_sidebar_2($version) {
  return [
     { text: 'Overview', link: '/'+$version+'/installation/guides/helm_chart/aws/' },
    {
      text: 'Steps',
      items: [
        { text: 'Step 1. Infrastructure Overview', link: '/'+$version+'/installation/guides/helm_chart/aws/infrastructure_overview' },
        { text: 'Step 2. Preparing the Infrastructure', link: '/'+$version+'/installation/guides/helm_chart/aws/preparing_infrastructure' },        
        { text: 'Step 3. Configuration', link: '/'+$version+'/installation/guides/helm_chart/aws/configuration' },
        { text: 'Step 4. Installation', link: '/'+$version+'/installation/guides/helm_chart/aws/installation' },
      ]
    }
  ]
}

function azure_sidebar($version) {
  return [
     { text: 'Overview', link: '/'+$version+'/installation/guides/helm_chart/azure/' },
    {
      text: 'Steps',
      items: [
        { text: 'Step 1. Infrastructure Overview', link: '/'+$version+'/installation/guides/helm_chart/azure/infrastructure_overview' },
        { text: 'Step 2. Preparing the Infrastructure', link: '/'+$version+'/installation/guides/helm_chart/azure/preparing_infrastructure' },
        { text: 'Step 3. Preparing the Queue Server - Rabbit MQ', link: '/'+$version+'/installation/guides/helm_chart/azure/preparing_queue_server' },
        { text: 'Step 4. Configuration', link: '/'+$version+'/installation/guides/helm_chart/azure/configuration' },
        { text: 'Step 5. Installation', link: '/'+$version+'/installation/guides/helm_chart/azure/installation' },
      ]
    }
  ]
}

function azure_sidebar_2($version) {
  return [
     { text: 'Overview', link: '/'+$version+'/installation/guides/helm_chart/azure/' },
    {
      text: 'Steps',
      items: [
        { text: 'Step 1. Infrastructure Overview', link: '/'+$version+'/installation/guides/helm_chart/azure/infrastructure_overview' },
        { text: 'Step 2. Preparing the Infrastructure', link: '/'+$version+'/installation/guides/helm_chart/azure/preparing_infrastructure' },
        { text: 'Step 3. Configuration', link: '/'+$version+'/installation/guides/helm_chart/azure/configuration' },
        { text: 'Step 4. Installation', link: '/'+$version+'/installation/guides/helm_chart/azure/installation' },
      ]
    }
  ]
}

function gcp_sidebar($version) {
  return [
     { text: 'Overview', link: '/'+$version+'/installation/guides/helm_chart/gcp/' },
    {
      text: 'Steps',
      items: [
        { text: 'Step 1. Infrastructure Overview', link: '/'+$version+'/installation/guides/helm_chart/gcp/infrastructure_overview' },
        { text: 'Step 2. Preparing the Infrastructure', link: '/'+$version+'/installation/guides/helm_chart/gcp/preparing_infrastructure' },
        { text: 'Step 3. Preparing the Queue Server - Rabbit MQ', link: '/'+$version+'/installation/guides/helm_chart/gcp/preparing_queue_server' },
        { text: 'Step 4. Configuration', link: '/'+$version+'/installation/guides/helm_chart/gcp/configuration' },
        { text: 'Step 5. Installation', link: '/'+$version+'/installation/guides/helm_chart/gcp/installation' },
      ]
    }
  ]
}

function gcp_sidebar_2($version) {
  return [

     { text: 'Overview', link: '/'+$version+'/installation/guides/helm_chart/gcp/' },
    {
      text: 'Steps',
      items: [
        { text: 'Step 1. Infrastructure Overview', link: '/'+$version+'/installation/guides/helm_chart/gcp/infrastructure_overview' },
        { text: 'Step 2. Preparing the Infrastructure', link: '/'+$version+'/installation/guides/helm_chart/gcp/preparing_infrastructure' },        
        { text: 'Step 3. Configuration', link: '/'+$version+'/installation/guides/helm_chart/gcp/configuration' },
        { text: 'Step 4. Installation', link: '/'+$version+'/installation/guides/helm_chart/gcp/installation' },
      ]
    }
  ]
}

function oci_sidebar_2($version) {
  return [
     { text: 'Overview', link: '/'+$version+'/installation/guides/helm_chart/oci/' },
    {
      text: 'Steps',
      items: [
        { text: 'Step 1. Infrastructure Overview', link: '/'+$version+'/installation/guides/helm_chart/oci/infrastructure_overview' },
        { text: 'Step 2. Preparing the Infrastructure', link: '/'+$version+'/installation/guides/helm_chart/oci/preparing_infrastructure' },        
        { text: 'Step 3. Configuration', link: '/'+$version+'/installation/guides/helm_chart/oci/configuration' },
        { text: 'Step 4. Installation', link: '/'+$version+'/installation/guides/helm_chart/oci/installation' },
      ]
    }
  ]
}

function openshift_sidebar($version) {
  return [
     { text: 'Overview', link: '/'+$version+'/installation/guides/helm_chart/openshift/' },
    {
      text: 'Steps',
      items: [
        { text: 'Step 1. Infrastructure Overview', link: '/'+$version+'/installation/guides/helm_chart/openshift/infrastructure_overview' },
        { text: 'Step 2. Preparing the Infrastructure', link: '/'+$version+'/installation/guides/helm_chart/openshift/preparing_infrastructure' },
        { text: 'Step 3. Preparing the Queue Server - Rabbit MQ', link: '/'+$version+'/installation/guides/helm_chart/openshift/preparing_queue_server' },
        { text: 'Step 4. Configuration', link: '/'+$version+'/installation/guides/helm_chart/openshift/configuration' },
        { text: 'Step 5. Installation', link: '/'+$version+'/installation/guides/helm_chart/openshift/installation' },
      ]
    }
  ]
}

function openshift_sidebar_2($version) {
  return [
     { text: 'Overview', link: '/'+$version+'/installation/guides/helm_chart/openshift/' },
    {
      text: 'Steps',
      items: [
        { text: 'Step 1. Infrastructure Overview', link: '/'+$version+'/installation/guides/helm_chart/openshift/infrastructure_overview' },
        { text: 'Step 2. Preparing the Infrastructure', link: '/'+$version+'/installation/guides/helm_chart/openshift/preparing_infrastructure' },        
        { text: 'Step 3. Configuration', link: '/'+$version+'/installation/guides/helm_chart/openshift/configuration' },
        { text: 'Step 4. Installation', link: '/'+$version+'/installation/guides/helm_chart/openshift/installation' },
      ]
    }
  ]
}

function getting_started_sidebar() {
  return [
    // { text: 'Overview', link: '/knowledge_center/getting_started/' },
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction to Augoor', link: '/knowledge_center/getting_started/introduction' },
        { text: 'Login and Authentication', link: '/knowledge_center/getting_started/login_authentication' },
        { text: 'Roles and permissions', link: '/knowledge_center/getting_started/roles_permissions' }
      ]
    },
    {
      text: 'Repository Management',
      items: [
        { text: 'Manage repositories', link: '/knowledge_center/repository_management/manage_repositories' },
        { text: 'Repositories Status', link: '/knowledge_center/repository_management/repositories_status' },
        { text: 'Manage subscriptions', link: '/knowledge_center/repository_management/manage_subscriptions' },
        { text: 'Delete repositories', link: '/knowledge_center/repository_management/delete_repositories' },
      ]
    },
    {
      text: 'Code Search',
      items: [
        { text: 'Search Overview', link: '/knowledge_center/code_search/search_overview' },
        { text: 'How to use code search', link: '/knowledge_center/code_search/how_to_explore_documentation' }
        // { text: 'Interactive Tutorial', link: '/knowledge_center/code_search/Interactive_tutorial' }
      ]
    },
    {
      text: 'Code Documentation',
      items: [
        { text: 'Documentation Overview', link: '/knowledge_center/code_documentation/documentation_overview' },
        { text: 'How to explore code documentation', link: '/knowledge_center/code_documentation/interacting_documentation' }
      ]
    },
    {
      text: 'Code navigation',
      items: [
        { text: 'Augoor code navigation', link: '/knowledge_center/code_navigation/' },
        { text: 'How to use class diagrams', link: '/knowledge_center/code_navigation/how_to_use_class_diagrams' },
      ]
    },
    {
      text: 'Code visualization',
      items: [
        { text: 'Codemap', link: '/knowledge_center/code_visualization/codemaps_overview' },
        { text: 'Navigating codemap', link: '/knowledge_center/code_visualization/navigating_codemap' },
        { text: 'How to use codemap', link: '/knowledge_center/code_visualization/how_to_use_codemap' },
      ]
    },
    {
      text: 'Code Assistant',
      items: [
        { text: 'AI Code Assistant', link: '/knowledge_center/code_assistant/' }
      ]
    },
    {
      text: 'Security',
      items: [
        { text: 'Security protocols', link: '/knowledge_center/security/' },
      ]
    },
    {
      text: 'Support and Resources',
      items: [
        { text: 'FAQs', link: '/knowledge_center/support_resources/faqs' },
        { text: 'Troubleshooting guides', link: '/knowledge_center/support_resources/troubleshooting_guides' },
        { text: 'What´s New', link: '/knowledge_center/support_resources/whats_new' },
        { text: 'Support contact', link: '/knowledge_center/support_resources/support_contact' },
      ]
    },
  ]
}