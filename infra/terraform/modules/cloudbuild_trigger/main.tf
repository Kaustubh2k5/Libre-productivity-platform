resource "google_cloudbuild_trigger" "this" {
  location   = var.location
  filename   = var.filename
  service_account = var.service_account
  repository_event_config {
    repository = var.repository
    push {
      branch = var.branch
    }
  }

  substitutions = var.substitutions
}
