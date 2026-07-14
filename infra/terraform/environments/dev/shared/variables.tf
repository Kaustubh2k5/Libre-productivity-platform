variable "project_id" {
  type = string
}

variable "region" {
  type = string
}

# variable "db_password" {
#   type      = string
#   sensitive = true
# }

# variable "jwt_secret" {
#   type      = string
#   sensitive = true
# }

# variable "refresh_secret" {
#   type      = string
#   sensitive = true
# }

# variable "mail_password" {
#   type      = string
#   sensitive = true
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
