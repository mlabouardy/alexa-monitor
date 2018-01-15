provider "aws" {
  region = "${var.region}"
  secret_key = "${var.secret_key}"
  access_key = "${var.access_key}"
}


resource "aws_instance" "default" {
  count = "${length(var.hostnames)}"
  ami = "${lookup(var.ami, var.region)}"
  instance_type = "${var.instance_type}"

  tags {
    Name = "${element(var.hostnames,count.index)}"
  }
}
