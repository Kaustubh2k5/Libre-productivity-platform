resource "google_redis_instance" "redis" {
  name           = var.name
  tier           = "BASIC"

  memory_size_gb = var.memory_size_gb

  region = var.region

  authorized_network = var.network_id

  redis_version = "REDIS_7_0"

  connect_mode = "PRIVATE_SERVICE_ACCESS"

  display_name = var.display_name

  transit_encryption_mode = "DISABLED"
}