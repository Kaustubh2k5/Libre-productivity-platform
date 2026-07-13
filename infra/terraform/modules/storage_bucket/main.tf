resource "google_storage_bucket" "bucket" {

  project = var.project_id

  name = var.bucket_name

  location = var.location

  uniform_bucket_level_access = true

  public_access_prevention = "inherited"

  force_destroy = var.force_destroy

  versioning {
    enabled = var.versioning
  }

  website {

    main_page_suffix = "index.html"

    not_found_page = "index.html"

  }

}

resource "google_storage_bucket_iam_member" "public_read" {

  bucket = google_storage_bucket.bucket.name

  role = "roles/storage.objectViewer"

  member = "allUsers"

}