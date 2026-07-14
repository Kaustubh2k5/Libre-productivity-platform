output "network_id" {
  value = module.vpc.network_id
}

output "network_name" {
  value = module.vpc.network_name
}

output "vpc_connector_id" {
  value = module.vpc_connector.connector_id
}

output "cloudsql_connection_name" {
  value = module.cloudsql.connection_name
}

output "cloudsql_public_ip" {
  value = module.cloudsql.public_ip
}

output "cloudsql_private_ip" {
  value = module.cloudsql.private_ip
}

output "cloudsql_database_name" {
  value = module.cloudsql.database_name
}

output "cloudsql_database_user" {
  value = module.cloudsql.database_user
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

output "artifact_registry_id" {
  value = var.artifact_registry_id
}

output "terraform_sa_email" {
  value = module.terraform_sa.email
}

output "frontend_sa_email" {
  value = module.frontend_sa.email
}

output "wif_provider_name" {
  value = module.github_wif.provider_name
}

output "frontend_bucket_name" {
  value = module.frontend_bucket.bucket_name
}

output "frontend_url_map_name" {
  value = "${var.frontend_lb_name}-url-map"
}

output "frontend_lb_ip" {
  value = module.frontend_lb.ip_address
}
