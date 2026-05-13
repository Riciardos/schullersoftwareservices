variable "frontend_bucket_name" {
  default = "schullersoftwareservices.com"
}

variable "api_certificate_arn" {
  description = "ARN of ACM certificate for api.schullersoftwareservices.com (must be in us-east-1)"
}