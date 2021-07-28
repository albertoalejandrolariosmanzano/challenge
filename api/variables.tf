#####################################################
        ########## GLOBALS ##########
#####################################################
variable "vpc_id" {
  type        = string
  description = "VPC ID"
}
variable "public_subnets" {
  type        = list(string)
  description = "Public Block cidr"
}
variable "private_subnets" {
  type        = list(string)
  description = "Private Block cidr"
}
variable "cidr_egress" {
  type        = list(string)
  description = "Egress IP"
}

variable "load_balancer_dns" {
  type        = string
  description = "Load Balancer DNS"
}

variable "load_balancer_zone" {
  type        = string
  description = "Load Balancer ZONE"
}

#####################################################
        ########## STAGING ENV ##########
#####################################################

# RDS

# S3

# ECR
variable "app_s" {
  type        = string
  description = "App container"
}

#####################################################
        ########## PRODUCTION ENV ##########
#####################################################

# RDS

# S3

# ECR
variable "app_p" {
  type        = string
  description = "App container"
}