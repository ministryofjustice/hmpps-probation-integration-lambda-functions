import logging
import os

import auth
import delius_api_service
import pre_sentence_service
from urllib3.connection import HTTPConnection

logger = logging.getLogger(__name__)
logger.setLevel(os.getenv('LOG_LEVEL', 'INFO'))
HTTPConnection.debuglevel = 1 if logger.isEnabledFor(logging.DEBUG) else 0


def handler(event, context):
    logger.debug(f'event: {event}')
    logger.debug(f'context: {context}')

    # get values from the event message
    crn = str(next(personId['value'] for personId in event['personReference']['identifiers']
                   if personId['type'] == 'CRN'))
    psr_id = str(event['additionalInformation']['reportId'])
    logger.info(f'Processing pre-sentence report for CRN {crn} with id {psr_id}')

    # authenticate
    access_token = auth.get_access_token()

    # get the file from the PSR service
    file = pre_sentence_service.get_pdf_file(psr_id=psr_id, access_token=access_token)
    logger.info(f'Got file with size: {len(file)}')

    # upload the file to Delius
    delius_api_service.put_pre_sentence_report(crn=crn, psr_id=psr_id, file=file, access_token=access_token)
    logger.info('Successfully saved file to Delius')
