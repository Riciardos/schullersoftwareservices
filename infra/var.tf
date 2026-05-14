variable "frontend_bucket_name" {
  default = "schullersoftwareservices.com"
}

variable "api_certificate_arn" {
  description = "ARN of ACM certificate for api.schullersoftwareservices.com (must be in us-east-1)"
}

variable "lambda_source_hash" {
  description = "ETag of the Lambda ZIP in S3, passed from CI to trigger redeployment"
  default     = null
}