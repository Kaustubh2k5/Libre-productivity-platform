resource "google_compute_backend_bucket" "backend" {

  name = var.backend_bucket_name

  bucket_name = var.bucket_name

  enable_cdn = true

  compression_mode = "AUTOMATIC"

  cdn_policy {

    cache_mode = "CACHE_ALL_STATIC"

    default_ttl = 3600

    client_ttl = 3600

    max_ttl = 86400

    negative_caching = true

    serve_while_stale = 86400

  }

}