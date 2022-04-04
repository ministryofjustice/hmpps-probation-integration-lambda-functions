# Probation Integration Lambda Functions

Probation Integration Lambda functions, typically used for processing HMPPS domain events and calling API endpoints.

## Adding a Lambda Function
* Add Terraform resources to the [hmpps-delius-core-terraform](https://github.com/ministryofjustice/hmpps-delius-core-terraform) repository. Example: [lambda/pre-sentence-report-handler.tf](https://github.com/ministryofjustice/hmpps-delius-core-terraform/blob/main/lambda/pre-sentence-report-handler.tf).
* Create a new directory at the root of the project and add some code
* Update the .circleci/config.yml file to add a pipeline for building, testing and deploying your Lambda function

## Infrastructure
This project only contains the actual function code, without any infrastructure or configuration.
