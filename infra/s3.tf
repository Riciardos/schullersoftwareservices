resource "aws_s3_bucket" "frontend" {
  bucket = var.frontend_bucket_name
  acl    = "public-read"

  website {
    error_document = "error.html"
    index_document = "index.html"
  }
}

resource "aws_s3_bucket" "website_redirect" {
  bucket = "www.${var.frontend_bucket_name}"
  acl    = "public-read"

  website {
    redirect_all_requests_to = var.frontend_bucket_name
  }
}