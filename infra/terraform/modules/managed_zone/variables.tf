variable "zone_name" {
  type = string
}

variable "dns_name" {
  type = string
}

variable "description" {
  type = string

  default = ""
}

variable "visibility" {
  type = string

  default = "public"
}
