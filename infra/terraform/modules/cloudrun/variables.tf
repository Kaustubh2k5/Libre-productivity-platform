variable "service_name" {
  type = string
}

variable "region" {
  type = string
}

variable "container_image" {
  type = string
}

variable "vpc_connector_id" {
  type = string
}

variable "service_account_email" {
  type = string
}

variable "env_vars" {
  type = map(string)

  default = {}
}

variable "secret_env_vars" {
  type    = map(string)
  default = {}
}
