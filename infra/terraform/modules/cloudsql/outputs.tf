output "connection_name" {
  value = google_sql_database_instance.postgres.connection_name
}

output "public_ip" {
  value = google_sql_database_instance.postgres.public_ip_address
}

output "database_name" {
  value = google_sql_database.auth_db.name
}

output "database_user" {
  value = google_sql_user.auth_user.name
}

output "private_ip" {
  value = google_sql_database_instance.postgres.private_ip_address
}