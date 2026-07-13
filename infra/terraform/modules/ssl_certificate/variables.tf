variable "certificate_name" {
  description = "Managed SSL certificate name"
  type        = string
}

variable "domains" {
  description = "Domains covered by the certificate"
  type        = list(string)
}