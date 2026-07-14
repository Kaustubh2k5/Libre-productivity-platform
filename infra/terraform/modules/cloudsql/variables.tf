variable "region" {
  type = string
}

variable "instance_name" {
  type        = string
  description = "Cloud SQL instance name"
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

