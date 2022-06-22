variable "project" {
  type = string
  description = "Project name to "
}

variable "region" {
  type = string
  description = "Region to set up infra in"
}


variable "environment" {
  type = string
  description = "Environment to deploy to (and folder name of tfstate)"
}


variable "website-bucket-name" {
  type = string
  description = "Bucket name (not ARN) of S3 hosting bucket"
}

variable "api-name" {
  type = string
  description = "API name"
}