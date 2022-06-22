provider "aws" {
  region = var.region

}

terraform {
  backend "s3" {
    bucket         = "chrisvroegop.com-terraform"
    key            = "PROD/terraform.tfstate"
    region         = "ap-southeast-2"
  }
}
