import os

import pytest
import requests_mock
from mock import mock
from requests import HTTPError

import auth

os.environ['OAUTH_BASE_URL'] = 'http://localhost:8080'


@requests_mock.Mocker(kw="req")
@mock.patch('auth.get_client_credentials')
def test_valid_credentials(client_credentials, **kwargs):
    # given valid credentials
    client_credentials.return_value = ('client_id', 'client_secret')
    kwargs['req'].post('http://localhost:8080/oauth/token?grant_type=client_credentials',
                       json={'access_token': 'test_token'})

    # when I request an access token
    token = auth.get_access_token()

    # then it returns the correct value
    assert token == 'test_token'


@requests_mock.Mocker(kw="req")
@mock.patch('auth.get_client_credentials')
def test_invalid_credentials(client_credentials, **kwargs):
    # given invalid credentials
    client_credentials.return_value = ('client_id', 'client_secret')
    kwargs['req'].post('http://localhost:8080/oauth/token?grant_type=client_credentials',
                       status_code=401)

    # when I request an access token
    with pytest.raises(HTTPError) as e:
        auth.get_access_token()

    # then it returns an error
    assert e.value.response.status_code == 401
