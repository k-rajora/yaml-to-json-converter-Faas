variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "aws_region" {
  type        = string
  default     = "ap-south-1"
}

variable "cloudflare_api_token" {
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  type = string
}

variable "domain_name" {
  type = string
}
