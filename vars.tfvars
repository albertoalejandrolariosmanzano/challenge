#####################################################
        ########## GLOBAL ##########
#####################################################
aws_region          = "us-east-2"

# Route 53

# EKS
cluster_name        = "challenge-test"

# Rols & Users
map_rols            = [{
  rolearn  = "arn:aws:iam::228559816236:role/eks-rol"
  username = "eks-rol"
  groups   = ["system:masters"]
}]
map_users           = [{
  userarn  = "arn:aws:iam::228559816236:user/deploy"
  username = "deploy"
  groups   = ["system:masters"]
}]

load_balancer_zone = ""
load_balancer_dns = ""

#####################################################
        ########## STAGING ENV ##########
#####################################################

# ECR
app_s             = "api-staging"

#####################################################
       ########## PRODUCTION ENV ##########
#####################################################

# ECR
app_p             = "api-production"