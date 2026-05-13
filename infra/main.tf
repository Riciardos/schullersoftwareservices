terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.26"
    }
  }

  backend "s3" {
    bucket = "rs-terraform-state-bucket"
    key    = "schuller-software-services"
    region = "eu-central-1"
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  region = "eu-central-1"
}

