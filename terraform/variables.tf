variable "region" {}
variable "access_key" {}
variable "secret_key" {}
variable "key_name" {}

variable "amis" {
  description = "Amazon Linux Image 2017.09.1"
  type = "map"
  default {
    "us-east-1" = "ami-55ef662f"
    "us-east-2" = "ami-15e9c770"
    "us-west-1" = "ami-a51f27c5"
    "us-west-2" = "ami-bf4193c7"
    "eu-west-1" = "ami-1a962263"
    "eu-west-2" = "ami-e7d6c983"
    "eu-central-1" = "ami-bf2ba8d0"
    "ap-south-1" = "ami-d5c18eba"
    "ap-northeast-1" = "ami-da9e2cbc"
    "ap-northeast-2" = "ami-1196317f"
    "ap-southeast-1" = "ami-c63d6aa5"
    "ap-southeast-2" = "ami-ff4ea59d"
    "ca-central-1" = "ami-d29e25b6"
    "sa-east-1" = "ami-286f2a44"
  }
}

variable "instance_type" {
  description = "Machine Specs"
  default = "t2.micro"
}

variable "hostnames" {
  type = "list"
  default = ["Paris", "London", "Rabat"]
}
