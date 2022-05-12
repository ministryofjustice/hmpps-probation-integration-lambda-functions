import logging
import os

import boto3
import requests

logger = logging.getLogger(__name__)
logger.setLevel(os.getenv('LOG_LEVEL', 'INFO'))

ssm = boto3.client('ssm', region_name='eu-west-2')
client_id = None
client_secret = None


def header(token):
    return {'Authorization': f'Bearer {token}'}


def get_access_token():
    response = requests.post(f'{os.getenv("OAUTH_BASE_URL")}/oauth/token?grant_type=client_credentials',
                             auth=get_client_credentials())
    response.raise_for_status()
    return response.json()['access_token']


def get_client_credentials():
    global client_id
    global client_secret

    if client_id is None or client_secret is None or os.getenv('REFRESH_SSM_PARAMETERS').lower() == 'true':
        logger.info('Refreshing client id and secret from parameter store')
        client_id = ssm.get_parameter(Name=os.getenv('OAUTH_CLIENT_ID_PARAMETER'),
                                      WithDecryption=True)['Parameter']['Value']
        client_secret = ssm.get_parameter(Name=os.getenv('OAUTH_CLIENT_SECRET_PARAMETER'),
                                          WithDecryption=True)['Parameter']['Value']

    return client_id, client_secret
