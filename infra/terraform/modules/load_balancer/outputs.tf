output "ip_address" {
  value = google_compute_global_address.this.address
}

output "url_map" {
  value = google_compute_url_map.this.id
}

output "https_proxy" {
  value = google_compute_target_https_proxy.this.id
}

output "url_map_name" {
  value = google_compute_url_map.this.name
}
