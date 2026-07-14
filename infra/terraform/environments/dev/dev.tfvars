# Non-sensitive dev configuration (safe to commit).
# Sensitive values come from local terraform.tfvars or CI TF_VAR_* secrets.

project_id            = "libre-26"
region                = "asia-south1"
# API Gateway is not available in asia-south1; use northeast as fallback.
gateway_region        = "asia-northeast1"
service_account_email = "terraform@libre-26.iam.gserviceaccount.com"

network_name                  = "auth-vpc"
subnet_name                   = "auth-subnet"
subnet_cidr                   = "10.10.0.0/24"
vpc_connector_name            = "auth-vpc-connector"
vpc_connector_cidr            = "10.8.0.0/28"
redis_name                    = "auth-redis-dev"
redis_display_name            = "Libre Redis Dev"
cloudsql_instance_name        = "auth-postgres-dev"
# Keep existing repo id to avoid destroying images; rename later when ready to migrate.
artifact_registry_id          = "auth-repo"
artifact_registry_description = "Shared container images for Libre services"

frontend_bucket_name         = "libre-frontend-dev"
frontend_backend_bucket_name = "libre-frontend-backend"
frontend_lb_name             = "libre-frontend-lb"
ssl_certificate_name         = "libre-cert"
ssl_domains = [
  "libre-productivity.xyz",
  "www.libre-productivity.xyz",
]
dns_managed_zone = "libre-zone"
dns_name         = "libre-productivity.xyz"

github_owner       = "Kaustubh2k5"
github_repository  = "Libre-productivity-platform"
wif_allowed_branch = "development"
wif_pool_id        = "github-pool-v2"
wif_provider_id    = "github-provider"

otp_ttl                   = 300
otp_max_attempts          = 10
max_signup_attempts       = 5
lock_time_seconds         = 900
access_token_expiry       = "15m"
refresh_token_expiry_days = 30
refresh_token_ttl         = 2592000
mail_user                 = "libre.app.2026@gmail.com"
client_id                 = "libre-web-app"
