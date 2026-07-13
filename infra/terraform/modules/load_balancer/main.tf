resource "google_compute_global_address" "this" {

  name = "${var.name}-ip"

}

resource "google_compute_url_map" "this" {

  name = "${var.name}-url-map"

  default_service = var.backend_bucket_name

}

resource "google_compute_target_https_proxy" "this" {

  name = "${var.name}-https-proxy"

  url_map = google_compute_url_map.this.id

  ssl_certificates = [
    var.ssl_certificate_self_link
  ]

}

resource "google_compute_global_forwarding_rule" "this" {

  name = "${var.name}-https-forwarding-rule"

  ip_protocol = "TCP"

  load_balancing_scheme = "EXTERNAL"

  port_range = "443"

  target = google_compute_target_https_proxy.this.id

  ip_address = google_compute_global_address.this.id

}