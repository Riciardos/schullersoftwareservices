resource "aws_api_gateway_rest_api" "rest_api" {
  name = "Serverless API"
}

resource "aws_api_gateway_resource" "http_resource" {

  parent_id   = aws_api_gateway_rest_api.rest_api.root_resource_id
  path_part   = "{proxy+}"
  rest_api_id = aws_api_gateway_rest_api.rest_api.id

}

resource "aws_api_gateway_method" "api_method" {

  authorization = "NONE"
  http_method   = "ANY"
  resource_id   = aws_api_gateway_resource.http_resource.id
  rest_api_id   = aws_api_gateway_rest_api.rest_api.id
}
