output "api_gateway_url" {
  value = aws_apigatewayv2_stage.default.invoke_url
}

output "api_cloudfront_domain" {
  value = aws_cloudfront_distribution.api.domain_name
}
