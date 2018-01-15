output "Nodes" {
  value = "${join(" ",aws_instance.default.*.public_ip)}"
}
