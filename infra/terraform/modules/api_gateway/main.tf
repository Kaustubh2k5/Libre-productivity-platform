resource "local_file" "openapi_spec" {
  filename = "${path.module}/generated-openapi.yaml"

  content = replace(
    file("${path.module}/openapi.yaml"),
    "CLOUD_RUN_URL",
    var.cloudrun_url
  )
}

resource "google_api_gateway_api" "api" {
  provider = google-beta
  api_id =var.api_id
}

resource "google_api_gateway_api_config" "api_config" {
  provider = google-beta
  api =google_api_gateway_api.api.api_id

  api_config_id_prefix = "${var.api_id}-config"
  lifecycle {
    create_before_destroy = true
  }

  openapi_documents {
    document {
      path ="openapi.yaml"

      contents =base64encode(
          local_file.openapi_spec.content
        )
    }
  }

  depends_on = [
    local_file.openapi_spec
  ]
}

resource "google_api_gateway_gateway" "gateway" {
  provider = google-beta
  gateway_id =var.gateway_id

  api_config = google_api_gateway_api_config.api_config .id

  region = var.region
}