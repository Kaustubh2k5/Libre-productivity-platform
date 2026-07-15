module "terraform_sa" {
  source = "../../../modules/service_account"

  project_id   = var.project_id
  account_id   = "terraform-deployer"
  display_name = "Terraform Deployer"
  description  = "Service account used by GitHub Actions to apply Terraform"
}

module "frontend_sa" {
  source = "../../../modules/service_account"

  project_id   = var.project_id
  account_id   = "frontend-deployer"
  display_name = "Frontend Deployer"
  description  = "Service account used by GitHub Actions and Cloud Build to deploy frontend assets"
}

module "frontend_iam" {
  source = "../../../modules/iam"

  project_id            = var.project_id
  service_account_email = module.frontend_sa.email

  roles = [
    "roles/storage.objectAdmin",
    "roles/compute.loadBalancerAdmin",
    "roles/cloudbuild.builds.editor",
    "roles/logging.logWriter",
    "roles/serviceusage.serviceUsageConsumer",
  ]
}

resource "google_service_account_iam_member" "frontend_deployer_act_as_self" {
  service_account_id = module.frontend_sa.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${module.frontend_sa.email}"
}

module "terraform_iam" {
  source = "../../../modules/iam"

  project_id            = var.project_id
  service_account_email = module.terraform_sa.email

  roles = [
    "roles/editor",
    "roles/iam.serviceAccountAdmin",
    "roles/resourcemanager.projectIamAdmin",
    "roles/iam.workloadIdentityPoolAdmin",
  ]
}
