import logging
import os

import auth
import requests

logger = logging.getLogger(__name__)
logger.setLevel(os.getenv('LOG_LEVEL', 'INFO'))


def put_pre_sentence_report(crn, psr_id, file, access_token):
    response = requests.put(f'{os.getenv("DELIUS_API_BASE_URL")}/v1/offenders/{crn}/pre-sentence-reports/{psr_id}',
                            headers=auth.header(access_token),
                            files={'fileData': (f'{crn}_pre-sentence-report_${psr_id}.pdf', file)})
    logger.debug(f'Response from delius-api: {response.json()}')
    response.raise_for_status()
