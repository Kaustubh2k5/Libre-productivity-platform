resource "google_sql_database_instance" "postgres" {
  name             = var.instance_name
  database_version = "POSTGRES_15"
  region           = var.region

  deletion_protection = false

  depends_on = [
    var.private_vpc_connection
  ]

  settings {
    tier    = "db-f1-micro"
    edition = "ENTERPRISE"

    disk_size = 10
    disk_type = "PD_SSD"

    availability_type = "ZONAL"

    

    ip_configuration {
      ipv4_enabled    = true
      private_network = var.network_id
    }

    backup_configuration {
      enabled = true
    }

    database_flags {
      name  = "max_connections"
      value = "200"
    }

    insights_config {
      query_insights_enabled = true
    }
  }
}

resource "google_sql_database" "auth_db" {
  name     = "authdb"
  instance = google_sql_database_instance.postgres.name
}

resource "google_sql_user" "auth_user" {
  name     = "authuser"
  instance = google_sql_database_instance.postgres.name
  password = var.db_password
}

# resource "null_resource" "enable_connection_pooling" {
#   depends_on = [
#     google_sql_database_instance.postgres
#   ]

#   provisioner "local-exec" {
#     command = <<EOT
# gcloud sql instances patch ${google_sql_database_instance.postgres.name} \
#   --project=${var.project_id} \
#   --enable-connection-pooling \
#   --quiet
# EOT
#   }
# }