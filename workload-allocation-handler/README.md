# Workload Allocation Handler

Typescript Lambda function that consumes "allocation" domain events from the [HMPPS Workload](https://github.com/ministryofjustice/hmpps-workload), 
and calls the corresponding Delius API endpoint to create an internal transfer record in Delius.

## Code formatting
Fix any linting issues:
```shell
npm run lint-fix
```

## Unit testing
Run the unit tests with:
```shell
npm run test
```

## Integration testing
When creating a pull request, the code will be deployed to the Delius test environment. You can then go to the [AWS Lambda console](https://eu-west-2.console.aws.amazon.com/lambda/home?region=eu-west-2#/functions/delius-test-workload-allocation-handler?tab=testing) 
and send the following test message to confirm the end-to-end integration is working. 
```json
{
  "Records": [
    {
      "messageId": "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
      "receiptHandle": "MessageReceiptHandle",
      "body": "{\"eventType\":\"person.community.manager.allocated\",\"version\":1,\"description\":\"Person allocated event\",\"detailUrl\":\"https://hmpps-workload-dev.hmpps.service.justice.gov.uk/allocation/person/1\",\"occurredAt\":\"2022-05-23T12:00:00Z\",\"additionalInformation\":{\"allocationId\":\"1\"},\"senderReference\":{\"identifiers\":[{\"type\":\"username\",\"value\":\"MarcusAspin\"}]},\"personReference\":{\"identifiers\":[{\"type\":\"CRN\",\"value\":\"D001024\"}]}}",
      "attributes": {
        "ApproximateReceiveCount": "1",
        "SentTimestamp": "1523232000000",
        "SenderId": "123456789012",
        "ApproximateFirstReceiveTimestamp": "1523232000001"
      },
      "messageAttributes": {},
      "md5OfBody": "{{{md5_of_body}}}",
      "eventSource": "aws:sqs",
      "eventSourceARN": "arn:aws:sqs:us-east-1:123456789012:MyQueue",
      "awsRegion": "us-east-1"
    }
  ]
}
```
