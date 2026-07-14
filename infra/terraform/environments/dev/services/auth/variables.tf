variable "project_id" {
  type = string
}

variable "region" {
  type        = string
  description = "Primary region for the auth Cloud Run service"
}

variable "gateway_region" {
  type        = string
  description = "Fallback region for API Gateway (not available in asia-south1)"
}

variable "service_account_email" {
  type = string
}

variable "container_image" {
  type = string
}

variable "vpc_connector_id" {
  type = string
}

variable "cloudsql_private_ip" {
  type = string
}

variable "redis_host" {
  type = string
}

variable "redis_port" {
  type = number
}

variable "otp_ttl" {
  type = number
}

variable "otp_max_attempts" {
  type = number
}

variable "max_signup_attempts" {
  type = number
}

variable "lock_time_seconds" {
  type = number
}

variable "access_token_expiry" {
  type = string
}

variable "refresh_token_expiry_days" {
  type = number
}

variable "refresh_token_ttl" {
  type = number
}

variable "mail_user" {
  type = string
}

variable "client_id" {
  type = string
}
