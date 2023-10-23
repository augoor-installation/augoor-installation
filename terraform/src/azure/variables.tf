variable "cloud_provider" {
    description = "cloud provider used for the instalation"
    type = string
    validation {
      condition = contains(["aws", "azure"], var.cloud_provider)
      error_message = "the supported cloud provider are 'aws' and 'azure'"
    } 
  
}
variable "environment" {
  description = ""
}