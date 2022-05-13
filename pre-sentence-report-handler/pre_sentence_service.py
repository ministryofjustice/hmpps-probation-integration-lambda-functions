import logging
import os

import auth
import requests

logger = logging.getLogger(__name__)
logger.setLevel(os.getenv('LOG_LEVEL', 'INFO'))


def get_pdf_file(psr_id, access_token):
    response = requests.get(f'{os.getenv("PRE_SENTENCE_SERVICE_BASE_URL")}/{psr_id}/pdf',
                            headers=auth.header(access_token))
    logger.debug(f'Response from pre-sentence-service: {response.content}')
    response.raise_for_status()
    return response.content
