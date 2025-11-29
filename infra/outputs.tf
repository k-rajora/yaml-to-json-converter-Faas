output "api_endpoint" {
  value = aws_apigatewayv2_api.api.api_endpoint
}

output "lambda_name" {
  value = aws_lambda_function.yaml_json_lambda.function_name
}

output "cloudflare_project_name" {
  value = cloudflare_pages_project.frontend.name
}
