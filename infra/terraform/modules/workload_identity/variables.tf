variable "project_id" {
  type = string
}

variable "project_number" {
  type = string
}

variable "pool_id" {
  type = string
}

variable "pool_display_name" {
  type = string
}

variable "provider_id" {
  type = string
}

variable "provider_display_name" {
  type = string
}

variable "github_owner" {
  type = string
}

variable "github_repository" {
  type = string
}

variable "allowed_branch" {
  type    = string
  default = "main"
}

variable "service_account_email" {
  type = string
}