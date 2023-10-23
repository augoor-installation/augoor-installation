

resource "azurerm_kubernetes_cluster" "cluster" {
  name                = "augoor-aks-cluster"
  location            = azurerm_resource_group.augoor-resource-group.location
  resource_group_name = azurerm_resource_group.augoor-resource-group.name
  dns_prefix          = "exampleaks1"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_D2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = "Production"
  }
}

output "client_certificate" {
  value     = azurerm_kubernetes_cluster.augoor-resource-group.kube_config.0.client_certificate
  sensitive = true
}

output "kube_config" {
  value = azurerm_kubernetes_cluster.augoor-resource-group.kube_config_raw

  sensitive = true
}