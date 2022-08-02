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
      "messageId": "2b8a34ed-852d-4b2b-abfb-a593764ad828",
      "receiptHandle": "AQEBsNc2+4v2rvtOXJ0YH/yj3Nu59w8jvm7z0wFyg5AjEA6UD4wIoRcuGwJ78cCjTClcP6tW+PDzQuPi42DiqC3Qr9L9KqNXgc/N6K5kL8VHqOPE1490aOkkglRxRsCKWhsgwaneOtcCAXL+M0qfBsOskBCWV8ArOSw8knxC4Q8pwJQCDYGy+oxjcsJcchLgkqguBjLOeS4/1VJcZJxgqulEmcdS9KPIIh0cwluVMeSS9WbJJhRZdm7ni1fWQKOIktAy7hce2MCDSMcZKZSKaXEO1eg8GSzMVKmdO4AzOHpaNssMY0CuX7Jb9XGNWU6YNANNHx+jhP8aW/jOovlu2D4ANwJPtzWw+sCF9ZS43SAfEWRU0IeisDWKjK71CZF+3ykcu9ITikzTOKMXroNPBqE1Audzudz2IwESQBJv1qxGq7RVV8HFssZREZhJVzuKXlHs4KFzf+SEVFMrdscFkfSL4g==",
      "body": "{\n  \"Type\" : \"Notification\",\n  \"MessageId\" : \"b7a2290c-fe68-5f2b-85d4-7229d81f694d\",\n  \"TopicArn\" : \"arn:aws:sns:eu-west-2:754256621582:cloud-platform-Digital-Prison-Services-e29fb030a51b3576dd645aa5e460e573\",\n  \"Message\" : \"{\\\"eventType\\\":\\\"person.community.manager.allocated\\\",\\\"version\\\":1,\\\"description\\\":\\\"Person allocated event\\\",\\\"detailUrl\\\":\\\"https://hmpps-workload-dev.hmpps.service.justice.gov.uk/allocation/person/e992bd09-68d6-4ff1-bf94-27b5b3050042\\\",\\\"occurredAt\\\":\\\"2022-06-16T13:38:15.555565627+01:00\\\",\\\"additionalInformation\\\":{\\\"allocationId\\\":\\\"e992bd09-68d6-4ff1-bf94-27b5b3050042\\\"},\\\"personReference\\\":{\\\"identifiers\\\":[{\\\"type\\\":\\\"CRN\\\",\\\"value\\\":\\\"X373307\\\"}]}}\",\n  \"Timestamp\" : \"2022-06-16T12:38:15.867Z\",\n  \"SignatureVersion\" : \"1\",\n  \"Signature\" : \"uH1rlAf2qh1T7pNhHDVKKSejIBZVZg2hBYiAW2fnSZv0gm1OQidWVWvhy8yDkl8CP2fgXfGhOciE3gmB+mPcv909aWaF1hUD5PFkUuZqd+EpX1qxON8WiZq+iegJkIOagusDMg2OrtlpERV3hxF7d+KHha6dzNJraIIOqwDkzj7wmUdjaLiQcdHkI4KqcoQM5nFEjk2vezze9GYTcCy94HOUoluTLajY03VmKVrzn5fG6+2odLPKi5kD9tSO5uXLONplBIwdD5r4IIvtH/XoiSh5CW6FLQDIoAzYs1N+k+nQ+QUsbfmgqr8aEQurKrvzHsCwaGDSaatz3RMdyhxqmg==\",\n  \"SigningCertURL\" : \"https://sns.eu-west-2.amazonaws.com/SimpleNotificationService-7ff5318490ec183fbaddaa2a969abfda.pem\",\n  \"UnsubscribeURL\" : \"https://sns.eu-west-2.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:eu-west-2:754256621582:cloud-platform-Digital-Prison-Services-e29fb030a51b3576dd645aa5e460e573:2a68f534-1437-40d4-95fd-1a2b2a1ed6b0\",\n  \"MessageAttributes\" : {\n    \"eventType\" : {\"Type\":\"String\",\"Value\":\"person.community.manager.allocated\"}\n  }\n}",
      "attributes": {
        "ApproximateReceiveCount": "2",
        "SentTimestamp": "1655383095899",
        "SenderId": "AIDAIVEA3AGEU7NF6DRAG",
        "ApproximateFirstReceiveTimestamp": "1655383095903"
      },
      "messageAttributes": {},
      "md5OfBody": "aea0ea88f8c9f2021e4f80926a717c8f",
      "eventSource": "aws:sqs",
      "eventSourceARN": "arn:aws:sqs:eu-west-2:754256621582:Digital-Prison-Services-dev-workforce_allocation_hmpps_queue",
      "awsRegion": "eu-west-2"
    }
  ]
}
```

