# Pre-Sentence Report Handler

Python3 Lambda function that consumes a "pre-sentence.report.completed" domain event from SQS, and uploads the 
corresponding report document into Delius (in PDF format). 

## Unit testing
Run the unit tests with:
```
pytest
```

## Integration testing
This test runs against the Delius test environment, and assumes an AWS profile is configured with the name "delius-test".
```
python3 integration_test.py
```
