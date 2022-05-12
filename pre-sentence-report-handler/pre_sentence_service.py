import os

import requests

import auth


def get_pdf_file(psr_id, access_token):
    response = requests.get(f'{os.getenv("PRE_SENTENCE_SERVICE_BASE_URL")}/{psr_id}/pdf',
                            headers=auth.header(access_token))
    response.raise_for_status()
    return response.content
