#####################################################
        ########## GLOBAL ##########
#####################################################

# variable "aws_access_key" {
#   type        = string
#   description = "aws access key"
# }

# variable "aws_secret_key" {
#   type        = string
#   description = "aws secret key"
# }

variable "aws_region" {
  type        = string
  description = "aws region"
}

# EKS
variable "cluster_name" {
  type        = string
  description = "Cluster name"
}

variable "map_rols" {
  type        = list(object({
    rolearn   = string
    username  = string
    groups    = list(string)
  }))
  description = "Map Rols"
}

variable "map_users" {
  type        = list(object({
    userarn   = string
    username  = string
    groups    = list(string)
  }))
  description = "Map Users"
}

# VPC
variable "cidr_block" {
  type        = string
  description = "Block cidr"
  default     = "10.10.0.0/16"
}

variable "private_subnets" {
  type        = list(string)
  description = "Private Block cidr"
  default     = ["10.10.1.0/24", "10.10.2.0/24", "10.10.3.0/24"]
}

variable "public_subnets" {
  type        = list(string)
  description = "Public Block cidr"
  default     = ["10.10.4.0/24", "10.10.5.0/24", "10.10.6.0/24"]
}

variable "cidr_egress" {
  type        = list(string)
  description = "Egress IP"
  default     = ["0.0.0.0/0"]
}

# Load Balancer
variable "load_balancer_zone" {
  type = string
  description = "Zone of load balancer"
}

variable "load_balancer_dns" {
  type = string
  description = "DNS of load balancer"
}

# S3
variable "s3_charts" {
  type        = string
  description = "Name bucket S3 Charts"
}
# Route 53

#####################################################
        ########## DEVELOPMENT ENV ##########
#####################################################

# RDS

#####################################################
        ########## STAGING ENV ##########
#####################################################

# RDS

# S3

# ECR
variable "app_s" {
  type        = string
  description = "App container of api"
}
#####################################################
        ########## PRODUCTION ENV ##########
#####################################################

# RDS

# S3

# ECR
variable "app_p" {
  type        = string
  description = "App container of api"
}