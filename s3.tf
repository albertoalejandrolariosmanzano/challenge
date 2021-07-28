#####################################################
        ########## CHARTS ##########
#####################################################
resource "aws_s3_bucket" "bucket" {
  bucket  = var.s3_charts
  acl     = "public-read"
  tags    = {
    Name        = "Project Charts"
  }
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "GET", "DELETE"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
  force_destroy = true
}
resource "aws_s3_bucket_policy" "bucket-policy" {
  bucket = aws_s3_bucket.bucket.id
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadForGetBucketObjects",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::${var.s3_charts}/*"
  }]
}
POLICY
}