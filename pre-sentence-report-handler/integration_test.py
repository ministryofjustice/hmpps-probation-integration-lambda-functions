import json
import os

import boto3

if __name__ == '__main__':
    os.environ['LOG_LEVEL'] = 'DEBUG'
    os.environ['OAUTH_CLIENT_ID_PARAMETER'] = '/delius-test/delius/delius-api/test/client-id'
    os.environ['OAUTH_CLIENT_SECRET_PARAMETER'] = '/delius-test/delius/delius-api/test/client-secret'
    os.environ['OAUTH_BASE_URL'] = 'https://sign-in-dev.hmpps.service.justice.gov.uk/auth'
    os.environ['DELIUS_API_BASE_URL'] = 'https://delius-api.test.probation.service.justice.gov.uk'
    os.environ['PRE_SENTENCE_SERVICE_BASE_URL'] = 'https://pre-sentence-service-dev.hmpps.service.justice.gov.uk'
    boto3.setup_default_session(profile_name='delius-test')

    import main
    main.handler(json.load(open('test_event.json')), None)
