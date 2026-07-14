module "cloudrun" {
  source = "../../../../modules/cloudrun"

  service_name          = "auth-service-dev"
  region                = var.region
  container_image       = var.container_image
  vpc_connector_id      = var.vpc_connector_id
  service_account_email = var.service_account_email

  env_vars = {
    DB_HOST                   = var.cloudsql_private_ip
    DB_PORT                   = "5432"
    DB_NAME                   = "authdb"
    DB_USER                   = "authuser"
    REDIS_HOST                = var.redis_host
    REDIS_PORT                = tostring(var.redis_port)
    NODE_ENV                  = "development"
    OTP_TTL                   = tostring(var.otp_ttl)
    OTP_MAX_ATTEMPTS          = tostring(var.otp_max_attempts)
    MAX_SIGNUP_ATTEMPTS       = tostring(var.max_signup_attempts)
    LOCK_TIME_SECONDS         = tostring(var.lock_time_seconds)
    ACCESS_TOKEN_EXPIRY       = var.access_token_expiry
    REFRESH_TOKEN_EXPIRY_DAYS = tostring(var.refresh_token_expiry_days)
    REFRESH_TOKEN_TTL         = tostring(var.refresh_token_ttl)
    MAIL_USER                 = var.mail_user
    CLIENT_ID                 = var.client_id
  }

  secret_env_vars = {
    JWT_ACCESS_SECRET  = "JWT_SECRET"
    JWT_REFRESH_SECRET = "REFRESH_SECRET"
    DB_PASSWORD        = "DB_PASSWORD"
    DATABASE_URL       = "DATABASE_URL"
    MAIL_PASSWORD      = "MAIL_PASSWORD"
  }
}

module "api_gateway" {
  source = "../../../../modules/api_gateway"

  api_id       = "auth-api-dev"
  gateway_id   = "auth-gateway-dev"
  region       = var.gateway_region
  cloudrun_url = module.cloudrun.service_url
}

resource "google_project_iam_member" "secret_accessor" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${var.service_account_email}"
}

resource "google_project_iam_member" "cloudsql_client" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${var.service_account_email}"
}

resource "google_project_iam_member" "artifact_registry_reader" {
  project = var.project_id
  role    = "roles/artifactregistry.reader"
  member  = "serviceAccount:${var.service_account_email}"
}
