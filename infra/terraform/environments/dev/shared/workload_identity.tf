module "github_wif" {
  source = "../../../modules/workload_identity"

  project_id = var.project_id

  pool_id           = var.wif_pool_id
  pool_display_name = "GitHub Pool V2"

  provider_id           = var.wif_provider_id
  provider_display_name = "GitHub Provider"

  github_owner      = var.github_owner
  github_repository = var.github_repository
  allowed_branch    = var.wif_allowed_branch

  service_account_emails = [
    module.terraform_sa.email,
    module.frontend_sa.email,
  ]
}
