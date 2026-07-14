module "memorystore" {
  source = "../../../modules/memorystore"

  name           = var.redis_name
  display_name   = var.redis_display_name
  region         = var.region
  network_id     = module.vpc.network_id
  memory_size_gb = 1
}
