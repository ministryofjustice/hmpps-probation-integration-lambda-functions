import json

import mock
import pytest
from requests import HTTPError

import main

test_event = json.load(open('test_event.json'))


@mock.patch('auth.get_access_token')
@mock.patch('pre_sentence_service.get_pdf_file')
@mock.patch('delius_api_service.put_pre_sentence_report')
def test_report_is_saved_successfully(delius_api_service, pre_sentence_service, auth):
    # given a valid token
    auth.return_value = 'test_token'

    # when I call the handler
    main.handler(test_event, None)

    # then it fetches the auth token
    auth.assert_called_once()

    # and it calls the pre-sentence service to get the pdf file
    pre_sentence_service.assert_called_once_with(
        psr_id='123e4567-e89b-12d3-a456-426614174000',
        access_token='test_token'
    )

    # and it uploads the file to the delius api service
    delius_api_service.assert_called_once_with(
        crn='D001022',
        psr_id='123e4567-e89b-12d3-a456-426614174000',
        file=mock.ANY,
        access_token='test_token'
    )


@mock.patch('auth.get_access_token', return_value='test_token')
@mock.patch('pre_sentence_service.get_pdf_file')
@mock.patch('delius_api_service.put_pre_sentence_report')
def test_pdf_not_found_returns_error(delius_api_service, pre_sentence_service, auth):
    # given a psr id that does not exist
    pre_sentence_service.side_effect = HTTPError(response=mock.Mock(status_code=404))

    # when I call the handler
    with pytest.raises(HTTPError) as e:
        main.handler(test_event, None)

    # then it returns an error
    assert e.value.response.status_code == 404


@mock.patch('auth.get_access_token', return_value='test_token')
@mock.patch('pre_sentence_service.get_pdf_file')
@mock.patch('delius_api_service.put_pre_sentence_report')
def test_crn_not_found_returns_error(delius_api_service, pre_sentence_service, auth):
    # given a crn that does not exist in delius
    delius_api_service.side_effect = HTTPError(response=mock.Mock(status_code=404))

    # when I call the handler
    with pytest.raises(HTTPError) as e:
        main.handler(test_event, None)

    # then it returns an error
    assert e.value.response.status_code == 404


@mock.patch('auth.get_access_token', return_value='test_token')
@mock.patch('pre_sentence_service.get_pdf_file')
@mock.patch('delius_api_service.put_pre_sentence_report')
def test_auth_failure_returns_error(delius_api_service, pre_sentence_service, auth):
    # given a crn that does not exist in delius
    auth.side_effect = HTTPError(response=mock.Mock(status_code=500))

    # when I call the handler
    with pytest.raises(HTTPError) as e:
        main.handler(test_event, None)

    # then it returns an error
    assert e.value.response.status_code == 500
