module "eks" {
  source                          = "terraform-aws-modules/eks/aws"
  cluster_name                    = var.cluster_name
  cluster_version                 = "1.18"
  cluster_create_timeout          = "1h"
  cluster_endpoint_private_access = true
  subnets                         = module.vpc.private_subnets
  vpc_id                          = module.vpc.vpc_id
  worker_groups = [{
    name                          = "challenges"
    instance_type                 = "t2.micro"
    additional_userdata           = "All software under development by terraform"
    asg_desired_capacity          = 1
    # asg_min_size                  = 1
    # asg_max_size                  = 5
    additional_security_group_ids = [ aws_security_group.eks_all_worker.id ]
  }]
#   worker_additional_security_group_ids = [aws_security_group.eks_all_worker.id]

  map_roles                        = var.map_rols
  map_users                        = var.map_users
  # map_accounts                   = var.map_accounts
  
  # write_kubeconfig   = true
  # kubeconfig_output_path = "./"
  # workers_group_defaults = {
  # 	root_volume_type = "gp2"
  # }
}

resource "aws_security_group" "eks_all_worker" {
  name_prefix = "all_worker_management"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    description = "HTTP"
    cidr_blocks = var.cidr_egress
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    description = "HTTPS"
    cidr_blocks = var.cidr_egress
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = var.cidr_egress
  }
}

resource "kubernetes_namespace" "staging" {
  metadata {
    name = "staging"
  }
}

resource "kubernetes_namespace" "production" {
  metadata {
    name = "production"
  }
}

resource "kubernetes_namespace" "ingress-controller" {
  metadata {
    name = "ingress-nginx"
  }
}