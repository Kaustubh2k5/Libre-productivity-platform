variable "managed_zone" {
  description = "Cloud DNS managed zone name"
  type        = string
}

variable "dns_name" {
  description = "Root domain"
  type        = string
}

variable "ip_address" {
  description = "Global Load Balancer IP"
  type        = string
}