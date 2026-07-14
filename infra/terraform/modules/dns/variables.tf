variable "managed_zone" {
  type = string
}

variable "dns_name" {
  type = string
}

variable "ip_address" {
  type = string
}

variable "ttl" {
  type = number

  default = 300
}
