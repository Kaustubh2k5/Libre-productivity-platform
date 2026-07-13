output "certificate_id" {
  value = google_compute_managed_ssl_certificate.this.id
}

output "certificate_name" {
  value = google_compute_managed_ssl_certificate.this.name
}

output "self_link" {
  value = google_compute_managed_ssl_certificate.this.self_link
}