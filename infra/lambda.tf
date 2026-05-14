resource "aws_s3_bucket" "lambda_artifacts" {
  bucket = "rs-lambda-artifacts"
}

resource "aws_s3_bucket_public_access_block" "lambda_artifacts" {
  bucket                  = aws_s3_bucket.lambda_artifacts.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_lambda_function" "micronaut_lambda" {
  function_name    = "MicronautAPI"
  s3_bucket        = aws_s3_bucket.lambda_artifacts.id
  s3_key           = "api-0.1.zip"
  source_code_hash = var.lambda_source_hash
  runtime          = "provided.al2023"
  handler          = "io.micronaut.function.aws.proxy.payload2.APIGatewayV2HTTPEventFunction"
  role             = aws_iam_role.lambda_exec.arn
  memory_size      = 1024
  timeout          = 15
}

resource "aws_cloudwatch_log_group" "micronaut_lambda_log_group" {
  name = "/aws/lambda/${aws_lambda_function.micronaut_lambda.function_name}"

  retention_in_days = 30
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "lambda_dynamodb" {
  name = "lambda_dynamodb_policy"
  role = aws_iam_role.lambda_exec.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem"
      ]
      Resource = aws_dynamodb_table.dynamo_table.arn
    }]
  })
}
