variable "name" {
  description = "Prefix for load balancer resources"
  type        = string
}

variable "backend_bucket_name" {
  description = "Backend bucket name"
  type        = string
}

variable "ssl_certificate_self_link" {
  description = "Managed SSL certificate self link"
  type        = string
}

variable "backend_bucket_self_link" {
  type = string
}