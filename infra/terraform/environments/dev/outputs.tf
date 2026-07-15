# output "cloudsql_connection_name" {
#   value = module.shared.cloudsql_connection_name
# }

# output "cloudsql_public_ip" {
#   value = module.shared.cloudsql_public_ip
# }

# output "redis_host" {
#   value = module.shared.redis_host
# }

# output "redis_port" {
#   value = module.shared.redis_port
# }

# output "artifact_registry_repo" {
#   value = module.shared.artifact_registry_repo
# }

# output "cloudrun_service_url" {
#   value = module.auth.service_url
# }

# output "api_gateway_url" {
#   value = module.auth.gateway_url
# }

# output "gateway_url" {
#   value = module.auth.gateway_url
# }

# output "service_account_email" {
#   value = module.auth.service_account_email
# }
output "frontend_trigger_id" {
  value = module.shared.frontend_trigger_id
}

output "frontend_bucket_name" {
  value = module.shared.frontend_bucket_name
}

output "frontend_url_map_name" {
  value = module.shared.frontend_url_map_name
}

output "frontend_lb_ip" {
  value = module.shared.frontend_lb_ip
}

output "terraform_sa_email" {
  value = module.shared.terraform_sa_email
}

output "frontend_sa_email" {
  value = module.shared.frontend_sa_email
}

output "wif_provider_name" {
  value = module.shared.wif_provider_name
}
