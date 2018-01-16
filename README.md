# Alexa Skill to monitor AWS Infrastructure

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
