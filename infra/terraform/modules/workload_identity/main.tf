resource "google_iam_workload_identity_pool" "this" {

  project = var.project_id

  workload_identity_pool_id = var.pool_id

  display_name = var.pool_display_name

  description = "GitHub Actions Workload Identity Pool"

}