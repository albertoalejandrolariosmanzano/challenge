provider "aws" {
  region  = var.aws_region
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.cluster.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)
  token                  = data.aws_eks_cluster_auth.cluster.token
  load_config_file       = false
  version                = "~> 1.9"
}

data "aws_eks_cluster" "cluster" {
  name = module.eks.cluster_id
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_id  
}

data "aws_availability_zones" "available" {}


module "api" {
  source              = "./api"
  vpc_id              = module.vpc.vpc_id
  public_subnets      = module.vpc.public_subnets
  private_subnets     = module.vpc.private_subnets
  cidr_egress         = var.cidr_egress
  load_balancer_dns   = var.load_balancer_dns
  load_balancer_zone  = var.load_balancer_zone
  
  #####################################################
              ########## RDS ##########
  #####################################################
  # Development
  # Staging
  # Production
  #####################################################
              ########## S3 ##########
  #####################################################
  # Staging
  # Production
  #####################################################
              ########## ECR ##########
  #####################################################
   # Staging
  app_s               = var.app_s
  # Production
  app_p               = var.app_p
}