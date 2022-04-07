import json

import mock

import main


@mock.patch('delius_api_service.put_pre_sentence_report')
def test_main_calls_psr(mocked_delius_api_service):
    # given a test event
    event = json.load(open('test_event.json'))

    # when I call the handler
    main.handler(event, None)

    # then it calls the delius api service
    mocked_delius_api_service.assert_called_once_with(
        crn='D001022',
        psr_id='urn:psr-service:pre-sentence-report:123e4567-e89b-12d3-a456-426614174000',
        file=mock.ANY
    )
