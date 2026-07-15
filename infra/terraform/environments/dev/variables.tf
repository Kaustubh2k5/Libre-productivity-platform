variable "project_id" {
  type = string
}

variable "region" {
  type        = string
  description = "Primary region for shared and service workloads (asia-south1)"
}

variable "gateway_region" {
  type        = string
  description = "Fallback region for services unavailable in the primary region (API Gateway → asia-northeast1)"
}

variable "service_account_email" {
  type        = string
  description = "Runtime service account for Cloud Run services"
}

variable "cloudbuild_repository" {
  type        = string
  description = "Cloud Build repository for frontend deployment"
}

# variable "jwt_secret" {
#   type      = string
#   sensitive = true
# }

# variable "refresh_secret" {
#   type      = string
#   sensitive = true
# }

# variable "db_password" {
#   type      = string
#   sensitive = true
# }

# variable "otp_ttl" {
#   type = number
# }

# variable "otp_max_attempts" {
#   type = number
# }

# variable "max_signup_attempts" {
#   type = number
# }

# variable "lock_time_seconds" {
#   type = number
# }

# variable "access_token_expiry" {
#   type = string
# }

# variable "refresh_token_expiry_days" {
#   type = number
# }

# variable "refresh_token_ttl" {
#   type = number
# }

# variable "mail_user" {
#   type = string
# }

# variable "mail_password" {
#   type      = string
#   sensitive = true
# }

# variable "client_id" {
#   type = string
# }

# variable "network_name" {
#   type = string
# }

# variable "subnet_name" {
#   type = string
# }

# variable "subnet_cidr" {
#   type = string
# }

# variable "vpc_connector_name" {
#   type = string
# }

# variable "vpc_connector_cidr" {
#   type = string
# }

# variable "redis_name" {
#   type = string
# }

# variable "redis_display_name" {
#   type = string
# }

# variable "cloudsql_instance_name" {
#   type = string
# }

# variable "artifact_registry_id" {
#   type = string
# }

# variable "artifact_registry_description" {
#   type = string
# }

variable "frontend_bucket_name" {
  type = string
}

variable "frontend_backend_bucket_name" {
  type = string
}

variable "frontend_lb_name" {
  type = string
}

variable "ssl_certificate_name" {
  type = string
}

variable "ssl_domains" {
  type = list(string)
}

variable "dns_managed_zone" {
  type = string
}

variable "dns_name" {
  type = string
}

variable "github_owner" {
  type = string
}

variable "github_repository" {
  type = string
}

variable "wif_allowed_branch" {
  type = string
}

variable "wif_pool_id" {
  type = string
}

variable "wif_provider_id" {
  type = string
}
