variable "project_id" {
  type = string
}

variable "name" {
  type = string
}
variable "service_account" {
  type = string
}
variable "location" {
  type    = string
  default = "asia-south1"
}

variable "repository" {
  type = string
}

variable "branch" {
  type = string
}

variable "filename" {
  type = string
}

variable "substitutions" {
  type = map(string)
  default = {}
}
