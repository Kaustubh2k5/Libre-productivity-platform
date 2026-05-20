variable "region" {
  type = string
}

variable "db_password" {
  type      = string
  sensitive = true
}
variable "network_id" {
  type = string
}

variable "private_vpc_connection" {
  type = string
}

variable "project_id" {
  type = string
}

