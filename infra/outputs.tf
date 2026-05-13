output "api_gateway_url" {
  value = aws_api_gateway_stage.api_stage.invoke_url
}

output "api_cloudfront_domain" {
  value = aws_cloudfront_distribution.api.domain_name
}
