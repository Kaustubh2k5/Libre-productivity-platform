module "shared" {
  source = "./shared"

  project_id = var.project_id
  region     = var.region

  # db_password    = var.db_password
  # jwt_secret     = var.jwt_secret
  # refresh_secret = var.refresh_secret
  # mail_password  = var.mail_password

  # network_name                  = var.network_name
  # subnet_name                   = var.subnet_name
  # subnet_cidr                   = var.subnet_cidr
  # vpc_connector_name            = var.vpc_connector_name
  # vpc_connector_cidr            = var.vpc_connector_cidr
  # redis_name                    = var.redis_name
  # redis_display_name            = var.redis_display_name
  # cloudsql_instance_name        = var.cloudsql_instance_name
  # artifact_registry_id          = var.artifact_registry_id
  # artifact_registry_description = var.artifact_registry_description

  frontend_bucket_name         = var.frontend_bucket_name
  frontend_backend_bucket_name = var.frontend_backend_bucket_name
  frontend_lb_name             = var.frontend_lb_name
  ssl_certificate_name         = var.ssl_certificate_name
  ssl_domains                  = var.ssl_domains
  dns_managed_zone             = var.dns_managed_zone
  dns_name                     = var.dns_name

  github_owner       = var.github_owner
  github_repository  = var.github_repository
  cloudbuild_repository = var.cloudbuild_repository
  wif_allowed_branch = var.wif_allowed_branch
  wif_pool_id        = var.wif_pool_id
  wif_provider_id    = var.wif_provider_id
}

# module "auth" {
#   source = "./services/auth"

#   project_id            = var.project_id
#   region                = var.region
#   gateway_region        = var.gateway_region
#   service_account_email = var.service_account_email
#   container_image       = "${module.shared.artifact_registry_repo}/auth-service:latest"
#   vpc_connector_id      = module.shared.vpc_connector_id
#   cloudsql_private_ip   = module.shared.cloudsql_private_ip
#   redis_host            = module.shared.redis_host
#   redis_port            = module.shared.redis_port

#   otp_ttl                   = var.otp_ttl
#   otp_max_attempts          = var.otp_max_attempts
#   max_signup_attempts       = var.max_signup_attempts
#   lock_time_seconds         = var.lock_time_seconds
#   access_token_expiry       = var.access_token_expiry
#   refresh_token_expiry_days = var.refresh_token_expiry_days
#   refresh_token_ttl         = var.refresh_token_ttl
#   mail_user                 = var.mail_user
#   client_id                 = var.client_id
# }

# # Preserve state addresses after the shared/services split.
# moved {
#   from = module.vpc
#   to   = module.shared.module.vpc
# }

# moved {
#   from = module.cloudsql
#   to   = module.shared.module.cloudsql
# }

# moved {
#   from = module.memorystore
#   to   = module.shared.module.memorystore
# }

# moved {
#   from = module.vpc_connector
#   to   = module.shared.module.vpc_connector
# }

# moved {
#   from = module.artifact_registry
#   to   = module.shared.module.artifact_registry
# }

# moved {
#   from = module.secrets
#   to   = module.shared.module.secrets
# }

# moved {
#   from = module.frontend_sa
#   to   = module.shared.module.frontend_sa
# }

# moved {
#   from = module.frontend_iam
#   to   = module.shared.module.frontend_iam
# }

# moved {
#   from = module.frontend_oidc
#   to   = module.shared.module.github_wif
# }

# moved {
#   from = module.frontend_bucket
#   to   = module.shared.module.frontend_bucket
# }

# moved {
#   from = module.frontend_backend_bucket
#   to   = module.shared.module.frontend_backend_bucket
# }

# moved {
#   from = module.frontend_ssl
#   to   = module.shared.module.frontend_ssl
# }

# moved {
#   from = module.frontend_lb
#   to   = module.shared.module.frontend_lb
# }

# moved {
#   from = module.frontend_dns
#   to   = module.shared.module.frontend_dns
# }

# moved {
#   from = module.cloudrun_auth
#   to   = module.auth.module.cloudrun
# }

# moved {
#   from = module.api_gateway
#   to   = module.auth.module.api_gateway
# }

# moved {
#   from = google_project_iam_member.secret_accessor
#   to   = module.auth.google_project_iam_member.secret_accessor
# }

# moved {
#   from = google_project_iam_member.cloudsql_client
#   to   = module.auth.google_project_iam_member.cloudsql_client
# }

# moved {
#   from = google_project_iam_member.artifact_registry_reader
#   to   = module.auth.google_project_iam_member.artifact_registry_reader
# }
