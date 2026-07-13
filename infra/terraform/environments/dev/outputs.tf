output "cloudsql_connection_name" {
  value = module.cloudsql.connection_name
}

output "cloudsql_public_ip" {
  value = module.cloudsql.public_ip
}

output "cloudrun_service_url" {
  value = module.cloudrun_auth.service_url
}

output "api_gateway_url" {
  value = module.api_gateway.gateway_url
}

output "redis_host" {
  value = module.memorystore.host
}

output "redis_port" {
  value = module.memorystore.port
}

output "artifact_registry_repo" {
  value = module.artifact_registry.repository_url
}

output "service_account_email" {
  value = module.cloudrun_auth.service_account_email
}

output "gateway_url" {
  value = module.api_gateway.gateway_url
}

output "frontend_bucket_name" {
  value = google_storage_bucket.frontend.name
}

output "frontend_backend_bucket" {
  value = google_compute_backend_bucket.frontend.id
}

