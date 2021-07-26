#####################################################
        ########## STAGING ##########
#####################################################
resource "aws_ecr_repository" "app-staging" {
  name                  = var.app_s
  image_tag_mutability  = "IMMUTABLE"
}

#####################################################
        ########## PRODUCTION ##########
#####################################################
resource "aws_ecr_repository" "app-production" {
  name                  = var.app_p
  image_tag_mutability  = "IMMUTABLE"
}