resource "google_dns_managed_zone" "this" {

  name = var.zone_name

  dns_name = "${trim(var.dns_name, ".")}."

  description = var.description

  visibility = var.visibility

}
