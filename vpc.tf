module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "2.6.0"
  name                                          = "xifra-vpc"
  cidr                                          = var.cidr_block
  azs                                           = data.aws_availability_zones.available.names
  private_subnets                               = var.private_subnets
  public_subnets                                = var.public_subnets
  assign_generated_ipv6_cidr_block              = true
  
  enable_nat_gateway                            = true
  single_nat_gateway                            = true
  enable_dns_hostnames                          = true

  tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
  }

  public_subnet_tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
    "kubernetes.io/role/elb"                    = "1"
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"           = "1"
  }
}