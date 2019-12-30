terraform {
  backend "azurerm" {}
}

provider "azurerm" {
  version         = "=1.36"
  subscription_id = "a3fa6f62-77b0-4b51-8017-5f1496d0a7ff"
}

variable "env" {}
variable "smtpPassword" {}
variable "prefix" {
  default = "sincerechiro"
}

resource "azurerm_resource_group" "rg" {
  name     = "${var.prefix}-${var.env}-rg"
  location = "East US"
}

module "function-app" {
  source                                    = "dfar-io/function-app/azurerm"
  version                                   = "2.0.2"
  function_app_name                         = "${var.prefix}-${var.env}-fa"
  function_app_plan_name                    = "${var.prefix}-${var.env}-faAsp"
  rg_location                               = azurerm_resource_group.rg.location
  rg_name                                   = azurerm_resource_group.rg.name
  storage_account_name                      = "${var.prefix}${var.env}sa"
  storage_account_kind                      = "StorageV2"
  storage_account_enable_https_traffic_only = "true"
  https_only                                = true
  cors_allowed_origins                      = ["https://sincerechiro.com"]

  app_settings = {
    WEBSITE_RUN_FROM_PACKAGE     = "1"
    SincereChiroSmtpServer       = "smtp.gmail.com"
    SincereChiroSmtpUsername     = "drmc@sincerechiro.com"
    SincereChiroToEmailAddress   = "drmc@sincerechiro.com"
    SincereChiroFromEmailAddress = "drmc@sincerechiro.com"
    SincereChiroSubject          = "Message from SincereChiro.com"
    SincereChiroSmtpPassword     = var.smtpPassword
  }
}

module "service-principal" {
  source                     = "dfar-io/service-principal/azurerm"
  version                    = "2.0.0"
  available_to_other_tenants = false
  name                       = "${var.prefix}-${var.env}-sp"
  subscription_id            = "a3fa6f62-77b0-4b51-8017-5f1496d0a7ff"
  scope_ids                  = [azurerm_resource_group.rg.id]
}

module "key-vault" {
  source      = "dfar-io/key-vault/azurerm"
  version     = "2.1.2"
  name        = "${var.prefix}-${var.env}-kv"
  rg_name     = azurerm_resource_group.rg.name
  rg_location = azurerm_resource_group.rg.location
  tenant_id   = "f3cd45d5-927c-47e7-838a-f48b95dc4fd7"

  access_policy = [
    {
      tenant_id = "f3cd45d5-927c-47e7-838a-f48b95dc4fd7"
      object_id = "8443b328-b32b-4626-b306-29762939ff37" // Key Vault Admin

      key_permissions = [
        "create",
        "get",
        "list",
        "wrapKey",
        "sign",
        "verify",
        "restore",
        "unwrapKey"
      ]

      secret_permissions = [
        "get",
        "set",
        "list",
        "backup",
        "restore",
        "delete"
      ]

      certificate_permissions = [
        "list",
        "import"
      ]
    },
    {
      tenant_id = "f3cd45d5-927c-47e7-838a-f48b95dc4fd7"
      object_id = "db0ad62f-a9b6-4db9-a2e9-4065d70f7d7b" //Azure CDN

      secret_permissions = [
        "Get",
      ]
      certificate_permissions = []
      key_permissions         = []
    }
  ]
}


resource "azurerm_cdn_profile" "cdn" {
  name                = "${var.prefix}-${var.env}-cdn"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "Premium_Verizon"
}

resource "azurerm_cdn_endpoint" "endpoint" {
  name                          = "${var.prefix}-${var.env}-cdnEndpoint"
  profile_name                  = azurerm_cdn_profile.cdn.name
  location                      = azurerm_resource_group.rg.location
  resource_group_name           = azurerm_resource_group.rg.name
  querystring_caching_behaviour = "NotSet"
  origin_host_header            = "${var.prefix}${var.env}sa.z13.web.core.windows.net"

  origin {
    name      = "sincerechiro"
    host_name = "${var.prefix}${var.env}sa.z13.web.core.windows.net"
  }
}

output "StorageAccount" {
  value = "1. Turn on static website in storage account."
}

output "CNAMERecords" {
  value = "2. Create CNAME Records: \n@ - ${azurerm_cdn_endpoint.endpoint.name}.azureedge.net"
}

output "CreateLetsEncryptCerts" {
  value = "3. Create 2 Let's Encrypt Certs, convert to PFX, add to Function App and Key Vault"
}

output "AddGithubActionsData" {
  value = "4. Create AZURE_CREDENTIALS with ID ${module.service-principal.client_id} and secret ${module.service-principal.client_secret}"
}
