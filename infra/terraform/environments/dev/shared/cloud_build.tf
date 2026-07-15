# Create the 2nd generation repository resource
resource "google_cloudbuildv2_repository" "webapp" {
  location           = var.region
  name               = var.github_repository
  parent_connection  = "projects/${var.project_id}/locations/${var.region}/connections/github"
  remote_uri         = "https://github.com/${var.github_owner}/${var.github_repository}.git"
}

# Create the trigger using GLOBAL location
module "frontend_trigger" {
  source = "../../../modules/cloudbuild_trigger"

  project_id   = var.project_id
  name         = "frontend-deploy"
  location     = var.region
  repository   = google_cloudbuildv2_repository.webapp.id
  branch       = "^development$"
  filename     = "cloudbuild/frontend.yaml"
  service_account = "projects/${var.project_id}/serviceAccounts/${module.frontend_sa.email}"

  substitutions = {
    _BUCKET_NAME = module.frontend_bucket.bucket_name
    _URL_MAP     = module.frontend_lb.url_map_name
  }
}
