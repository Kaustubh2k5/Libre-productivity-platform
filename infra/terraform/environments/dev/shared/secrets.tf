locals {
  database_url = "postgresql://${module.cloudsql.database_user}:${var.db_password}@${module.cloudsql.private_ip}:5432/${module.cloudsql.database_name}"
}

module "secrets" {
  source = "../../../modules/secret_manager"

  secrets = {
    JWT_SECRET     = var.jwt_secret
    REFRESH_SECRET = var.refresh_secret
    DB_PASSWORD    = var.db_password
    DATABASE_URL   = local.database_url
    MAIL_PASSWORD  = var.mail_password
  }
}
