resource "google_dns_record_set" "root" {

  name = "${var.dns_name}."

  managed_zone = var.managed_zone

  type = "A"

  ttl = 300

  rrdatas = [
    var.ip_address
  ]
}

resource "google_dns_record_set" "www" {

  name = "www.${var.dns_name}."

  managed_zone = var.managed_zone

  type = "CNAME"

  ttl = 300

  rrdatas = [
    "${var.dns_name}."
  ]
}