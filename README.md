# AWS Infrastructure Real-Time Monitoring

## Terraform

* Set AWS Credentials in variables.tfvars
* Provision Infrastructure:

```
terraform apply --var-file=variables.tfvars
```

## Ansible

```
ansible-playbook -i inventory playbook.yml --private-key=key.pem
```

## Lambda Function

* Set environment variables:
  * INFLUXDB_HOST
  * INFLUXDB_DATABASE

## Alexa Skill

[Real-Time Infrastructure Monitoring with Amazon Echo](http://www.blog.labouardy.com/real-time-infrastructure-monitoring-amazon-echo/)
