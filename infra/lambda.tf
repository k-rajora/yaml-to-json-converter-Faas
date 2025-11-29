resource "aws_lambda_function" "yaml_json_lambda" {
  function_name = "${var.project_name}-lambda"

  filename         = "lambda_stub.zip"   # dummy file on first apply
  handler          = "lambda_handler.lambda_handler"
  runtime          = "python3.12"
  role             = aws_iam_role.lambda_exec_role.arn
  source_code_hash = filebase64sha256("lambda_stub.zip")

  environment {
    variables = {
      LOG_LEVEL = "INFO"
    }
  }
}
