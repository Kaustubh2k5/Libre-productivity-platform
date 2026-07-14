output "root_record" {
  value = google_dns_record_set.root.name
}

output "www_record" {
  value = google_dns_record_set.www.name
}
