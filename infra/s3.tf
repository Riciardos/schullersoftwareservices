resource "aws_s3_bucket" "frontend" {
  bucket = var.frontend_bucket_name
}

resource "aws_s3_bucket_ownership_controls" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "frontend" {
  depends_on = [aws_s3_bucket_ownership_controls.frontend]
  bucket     = aws_s3_bucket.frontend.id
  acl        = "public-read"
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket" "website_redirect" {
  bucket = "www.${var.frontend_bucket_name}"
}

resource "aws_s3_bucket_ownership_controls" "website_redirect" {
  bucket = aws_s3_bucket.website_redirect.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "website_redirect" {
  depends_on = [aws_s3_bucket_ownership_controls.website_redirect]
  bucket     = aws_s3_bucket.website_redirect.id
  acl        = "public-read"
}

resource "aws_s3_bucket_website_configuration" "website_redirect" {
  bucket = aws_s3_bucket.website_redirect.id

  redirect_all_requests_to {
    host_name = var.frontend_bucket_name
  }
}
