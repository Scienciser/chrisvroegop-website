resource "aws_s3_bucket" "bucket" {
  bucket = vars.website-bucket-name

  tags = {
    Project = vars.project
    Environment = vars.environment
  }
}

resource "aws_s3_bucket_website_configuration" "bucket-website" {
  bucket = aws_s3_bucket.bucket.bucket

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_policy" "bucket-policy-attachment" {
  bucket = aws_s3_bucket.bucket.id
  policy = data.aws_iam_policy_document.bucket-policy.json
}

# Give CloudFront access to the S3 bucket
resource "aws_cloudfront_origin_access_identity" "cloudfront-identity" {}

data "aws_iam_policy_document" "bucket-policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.cloudfront-identity.iam_arn]
    }
  }
}
