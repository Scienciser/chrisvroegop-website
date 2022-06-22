resource "aws_api_gateway_rest_api" "api" {
  body = jsonencode({
	"openapi" : "3.0.1",
	"info" : {
		"title" : "${vars.api-name}",
		"version" : "2022-06-10T01:39:01Z"
	},
	"servers" : [ {
		"url" : "https://api.chrisvroegop.com"
	} ],
	"paths" : {
		"/putscore" : {
			"post" : {
				"responses" : {
					"200" : {
						"description" : "200 response",
						"content" : {
							"application/json" : {
								"schema" : {
								"$ref" : "#/components/schemas/Empty"
								}
							}
						}
					}
				}
			}
		},
		"/getscores" : {
			"get" : {
				"responses" : {
					"200" : {
						"description" : "200 response",
						"content" : {
							"application/json" : {
								"schema" : {
								"$ref" : "#/components/schemas/Empty"
								}
							}
						}
					}
				}
			}
		}
	},
	"components" : {
		"schemas" : {
			"Empty" : {
				"title" : "Empty Schema",
				"type" : "object"
			}
		}
	}
})

  name = vars.api-name

  endpoint_configuration {
	types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_deployment" "api-deployment" {
  rest_api_id = aws_api_gateway_rest_api.api.id

  # When the API schema changes, redeploy
  triggers = {
	  redeployment = sha1(jsonencode(aws_api_gateway_rest_api.api.body))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "example" {
  deployment_id = aws_api_gateway_deployment.example.id
  rest_api_id   = aws_api_gateway_rest_api.example.id
  stage_name    = "example"
}
