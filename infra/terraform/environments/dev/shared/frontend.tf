module "frontend_bucket" {

  source = "../../modules/storage_bucket"

  project_id = var.project_id

  bucket_name = "libre-frontend-dev"

  location = var.region
}

module "frontend_backend_bucket" {

  source = "../../modules/backend_bucket"

  bucket_name = module.frontend_bucket.bucket_name

  backend_bucket_name = "libre-frontend-backend"
}

module "frontend_ssl" {

  source = "../../modules/ssl_certificate"

  certificate_name = "libre-cert"

  domains = [
    "libre-productivyepity.xyz",
    "www.libre-productivity.xyz"
  ]
}

module "frontend_lb" {

  source = "../../modules/load_balancer"

  name = "frontend"

  backend_bucket_self_link = module.frontend_backend_bucket.self_link

  ssl_certificate_self_link = module.frontend_ssl.self_link
}

module "frontend_dns" {

  source = "../../modules/dns"

  managed_zone = "libre-zone"

  dns_name = "libre-productivity.xyz"

  ip_address = module.frontend_lb.ip_address
}