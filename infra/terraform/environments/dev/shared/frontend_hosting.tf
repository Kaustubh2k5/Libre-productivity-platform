data "google_project" "current" {
  project_id = var.project_id
}

module "frontend_bucket" {
  source = "../../../modules/storage_bucket"

  project_id  = var.project_id
  bucket_name = var.frontend_bucket_name
  location    = var.region
}

module "frontend_zone" {
  source = "../../../modules/managed_zone"

  zone_name   = "libre-zone"
  dns_name    = "libre-productivity.xyz"
  description = "Libre frontend DNS zone"
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

resource "google_project_iam_member" "cloudbuild_secret_admin" {
  project = var.project_id

  role = "roles/secretmanager.admin"

  member = "serviceAccount:service-${data.google_project.current.number}@gcp-sa-cloudbuild.iam.gserviceaccount.com"
}
