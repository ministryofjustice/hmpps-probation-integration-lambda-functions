# Probation Integration Lambda Functions

Probation Integration Lambda functions, typically used for processing HMPPS domain events and calling API endpoints.

## Adding a Lambda Function
* Add Terraform resources to the [hmpps-delius-core-terraform](https://github.com/ministryofjustice/hmpps-delius-core-terraform) repository. Example: [lambda/pre-sentence-report-handler.tf](https://github.com/ministryofjustice/hmpps-delius-core-terraform/blob/main/lambda/pre-sentence-report-handler.tf).
* Create a new directory at the root of this project and add some code. Example: [pre-sentence-report-handler](/pre-sentence-report-handler).
* Update the [.circleci/config.yml](/.circleci/config.yml) file to add a pipeline for building, testing and deploying your Lambda function.

## Support
Feel free to raise a GitHub issue, or get in touch on Slack: [#probation-integration-tech](https://mojdt.slack.com/archives/C02HQ4M2YQN).