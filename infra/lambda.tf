resource "aws_lambda_function" "micronaut_lambda" {
  function_name = "MicronautAPI"
  filename = "../api/api/target/api-0.1.jar"
  source_code_hash = base64sha256(filebase64("../api/api/target/api-0.1.jar"))
  runtime = "java11"
  handler = "io.micronaut.function.aws.proxy.MicronautLambdaHandler"
  role    = aws_iam_role.lambda_exec.arn
  memory_size = 1024
  timeout = 10
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
