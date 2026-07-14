module "cloudsql" {
  source = "../../../modules/cloudsql"

  project_id             = var.project_id
  region                 = var.region
  instance_name          = var.cloudsql_instance_name
  db_password            = var.db_password
  network_id             = module.vpc.network_id
  private_vpc_connection = module.vpc.private_vpc_connection
}
