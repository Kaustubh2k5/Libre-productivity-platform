resource "google_compute_managed_ssl_certificate" "this" {

  name = var.certificate_name

  managed {
    domains = var.domains
  }

}