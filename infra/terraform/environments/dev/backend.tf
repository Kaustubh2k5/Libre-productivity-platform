terraform {
  backend "gcs" {
    bucket = "libre-terraform-state"

    prefix = "dev"

    # Optional but recommended later:
    # impersonate_service_account = "terraform@project-id.iam.gserviceaccount.com"
  }
}