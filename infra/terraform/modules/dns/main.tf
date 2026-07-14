resource "google_dns_record_set" "root" {

  managed_zone = var.managed_zone

  name = "${trim(var.dns_name, ".")}."

  type = "A"

  ttl = var.ttl

  rrdatas = [
    var.ip_address
  ]

}

resource "google_dns_record_set" "www" {

  managed_zone = var.managed_zone

  name = "www.${trim(var.dns_name, ".")}."

  type = "CNAME"

  ttl = var.ttl

  rrdatas = [
    "${trim(var.dns_name, ".")}."
  ]

}
