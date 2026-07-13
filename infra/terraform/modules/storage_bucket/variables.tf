variable "project_id" {
  type = string
}

variable "bucket_name" {
  type = string
}

variable "location" {
  type = string
}

variable "force_destroy" {
  type    = bool
  default = false
}

variable "versioning" {
  type    = bool
  default = true
}