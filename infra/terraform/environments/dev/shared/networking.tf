# module "vpc" {
#   source = "../../../modules/vpc"

#   project_id   = var.project_id
#   region       = var.region
#   network_name = var.network_name
#   subnet_name  = var.subnet_name
#   subnet_cidr  = var.subnet_cidr
# }

# module "vpc_connector" {
#   source = "../../../modules/vpc_connector"

#   name          = var.vpc_connector_name
#   region        = var.region
#   network_name  = module.vpc.network_name
#   ip_cidr_range = var.vpc_connector_cidr
# }
