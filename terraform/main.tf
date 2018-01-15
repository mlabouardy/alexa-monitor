provider "aws" {
  region = "${var.region}"
  secret_key = "${var.secret_key}"
  access_key = "${var.access_key}"
}

resource "aws_instance" "default" {
  count = "${length(var.hostnames)}"
  ami = "${lookup(var.amis, var.region)}"
  instance_type = "${var.instance_type}"
  key_name = "${var.key_name}"
  user_data = "${file("setup.sh")}"

  tags {
    Name = "${element(var.hostnames,count.index)}"
  }
}
