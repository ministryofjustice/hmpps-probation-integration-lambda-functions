import os

import requests

import auth


def put_pre_sentence_report(crn, psr_id, file, access_token):
    response = requests.put(f'{os.getenv("DELIUS_API_BASE_URL")}/v1/offenders/{crn}/pre-sentence-reports/{psr_id}',
                            headers=auth.header(access_token),
                            files=file)
    response.raise_for_status()
