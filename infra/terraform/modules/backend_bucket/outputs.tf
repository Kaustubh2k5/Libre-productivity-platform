output "backend_bucket_id" {
  value = google_compute_backend_bucket.backend.id
}

output "backend_bucket_name" {
  value = google_compute_backend_bucket.backend.name
}

output "self_link" {
  value = google_compute_backend_bucket.backend.self_link
}