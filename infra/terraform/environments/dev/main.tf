data "google_project" "current" {
  project_id = var.project_id
}

module "vpc" {
  source = "../../modules/vpc"

  project_id = var.project_id

  region = var.region

  network_name = "auth-vpc"

  subnet_name = "auth-subnet"

  subnet_cidr = "10.10.0.0/24"
}

module "cloudsql" {
  source = "../../modules/cloudsql"

  project_id = var.project_id

  region = var.regionalt

  db_password = var.db_password

  network_id = module.vpc.network_id

  private_vpc_connection = module.vpc.private_vpc_connection
}
locals {
  database_url = "postgresql://${module.cloudsql.database_user}:${var.db_password}@${module.cloudsql.private_ip}:5432/${module.cloudsql.database_name}"
}
module "memorystore" {
  source = "../../modules/memorystore"

  name = "auth-redis-dev"

  display_name = "Auth Redis Dev"

  region = var.region

  network_id =module.vpc.network_id

  memory_size_gb = 1
}

module "vpc_connector" {
  source = "../../modules/vpc_connector"

  name = "auth-vpc-connector"

  region = var.region

  network_name = module.vpc.network_name

  ip_cidr_range = "10.8.0.0/28"
}

module "artifact_registry" {
  source = "../../modules/artifact_registry"

  project_id = var.project_id

  region = var.region

  repository_id = "auth-repo"

  description = "Auth service docker repository"
}

module "secrets" {
  source = "../../modules/secret_manager"

  secrets = {
    JWT_SECRET     = var.jwt_secret

    REFRESH_SECRET = var.refresh_secret

    DB_PASSWORD    = var.db_password

    DATABASE_URL   = local.database_url

    MAIL_PASSWORD  = var.mail_password
  }
}
module "cloudrun_auth" {
  source = "../../modules/cloudrun"

  service_name = "auth-service-dev"

  region = var.region

  container_image = "asia-south1-docker.pkg.dev/${var.project_id}/auth-repo/auth-service:latest"

  vpc_connector_id = module.vpc_connector.connector_id

  service_account_email = var.service_account_email
    depends_on = [
    module.secrets
  ]
  env_vars = {

    DB_HOST = module.cloudsql.private_ip

    DB_PORT = "5432"

    DB_NAME = "authdb"

    DB_USER = "authuser"

    REDIS_HOST = module.memorystore.host

    REDIS_PORT = tostring(module.memorystore.port)

    NODE_ENV = "development"

    OTP_TTL = tostring(var.otp_ttl)

    OTP_MAX_ATTEMPTS = tostring(var.otp_max_attempts)

    MAX_SIGNUP_ATTEMPTS = tostring(var.max_signup_attempts)

    LOCK_TIME_SECONDS = tostring(var.lock_time_seconds)

    ACCESS_TOKEN_EXPIRY = var.access_token_expiry

    REFRESH_TOKEN_EXPIRY_DAYS = tostring(var.refresh_token_expiry_days)

    REFRESH_TOKEN_TTL = tostring(var.refresh_token_ttl)

    MAIL_USER = var.mail_user

    CLIENT_ID = var.client_id
  }

  secret_env_vars = {
    JWT_ACCESS_SECRET  = "JWT_SECRET"

    JWT_REFRESH_SECRET = "REFRESH_SECRET"

    DB_PASSWORD    = "DB_PASSWORD"

    DATABASE_URL = "DATABASE_URL"

    MAIL_PASSWORD = "MAIL_PASSWORD"
    
  }
}

resource "google_project_iam_member" "secret_accessor" {
  project = var.project_id

  role ="roles/secretmanager.secretAccessor"

  member =  "serviceAccount:${var.service_account_email}"
}

resource "google_project_iam_member" "cloudsql_client" {
  project = var.project_id

  role ="roles/cloudsql.client"

  member = "serviceAccount:${var.service_account_email}"
}

resource "google_project_iam_member" "artifact_registry_reader" {
  project = var.project_id

  role ="roles/artifactregistry.reader"

  member = "serviceAccount:${var.service_account_email}"
}

module "api_gateway" {
  source = "../../modules/api_gateway"

  api_id     = "auth-api-dev"
  gateway_id = "auth-gateway-dev"

  region = var.regionalt

  cloudrun_url = module.cloudrun_auth.service_url
}

module "frontend_sa" {

  source = "../../modules/service_account"

  project_id = var.project_id

  account_id = "frontend-deployer"

  display_name = "Frontend Deployment"

  description = "Deploys frontend assets"

}

module "frontend_iam" {

  source = "../../modules/iam"

  project_id = var.project_id

  service_account_email = module.frontend_sa.email

  roles = [

    "roles/storage.objectAdmin",

    "roles/compute.loadBalancerAdmin"

  ]

}

module "frontend_oidc" {

  source = "../../modules/workload_identity"

  project_id     = var.project_id
  project_number = data.google_project.current.number

  pool_id = "github-pool"
  pool_display_name = "GitHub Pool"

  provider_id = "github-provider"
  provider_display_name = "GitHub Provider"

  github_owner = "Kaustubh2k5"
  github_repository = "Libre-productivity-platform"

  allowed_branch = "main"

  service_account_email = module.frontend_sa.email
}