module "frontend_bucket" {
  source = "../../../modules/storage_bucket"

  project_id  = var.project_id
  bucket_name = var.frontend_bucket_name
  location    = var.region
}

module "frontend_backend_bucket" {
  source = "../../../modules/backend_bucket"

  bucket_name         = module.frontend_bucket.bucket_name
  backend_bucket_name = var.frontend_backend_bucket_name
}

module "frontend_ssl" {
  source = "../../../modules/ssl_certificate"

  certificate_name = var.ssl_certificate_name
  domains          = var.ssl_domains
}

module "frontend_lb" {
  source = "../../../modules/load_balancer"

  name                      = var.frontend_lb_name
  backend_bucket_name       = module.frontend_backend_bucket.backend_bucket_id
  backend_bucket_self_link  = module.frontend_backend_bucket.self_link
  ssl_certificate_self_link = module.frontend_ssl.self_link
}

module "frontend_dns" {
  source = "../../../modules/dns"

  managed_zone = var.dns_managed_zone
  dns_name     = var.dns_name
  ip_address   = module.frontend_lb.ip_address
}
