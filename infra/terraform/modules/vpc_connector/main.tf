resource "google_vpc_access_connector" "connector" {
  name = var.name

  region = var.region

  network = var.network_name

  ip_cidr_range = var.ip_cidr_range

  min_instances = 2
  max_instances = 3
}