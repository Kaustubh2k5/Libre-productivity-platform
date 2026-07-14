output "service_url" {
  value = module.cloudrun.service_url
}

output "gateway_url" {
  value = module.api_gateway.gateway_url
}

output "service_account_email" {
  value = module.cloudrun.service_account_email
}
