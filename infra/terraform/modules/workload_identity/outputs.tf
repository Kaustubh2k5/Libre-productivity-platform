output "pool_id" {
  value = google_iam_workload_identity_pool.this.workload_identity_pool_id
}

output "pool_name" {
  value = google_iam_workload_identity_pool.this.name
}

output "provider_id" {
  value = google_iam_workload_identity_pool_provider.this.workload_identity_pool_provider_id
}

output "provider_name" {
  value = google_iam_workload_identity_pool_provider.this.name
}
