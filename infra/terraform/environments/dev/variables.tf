variable "project_id" {
  type = string
}

variable "region" {
  type = string
}

variable "service_account_email" {
  type = string
}

variable "jwt_secret" {
  type      = string
  sensitive = true
}

variable "refresh_secret" {
  type      = string
  sensitive = true
}

variable "db_password" {
  type      = string
  sensitive = true
}
variable "regionalt" {
  type        = string
  description = "The alternative deployment region"
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

variable "mail_password" {
  type = string
  sensitive = true
}

variable "client_id" {
  type = string
}