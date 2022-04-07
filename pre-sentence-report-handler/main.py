import delius_api_service
import pre_sentence_report_service


def handler(event, context):
    # get values from the event message
    crn = str(event["crn"])
    psr_id = str(event["pre_sentence_report_urn"])

    # get the file from PSR service
    file = pre_sentence_report_service.get_pre_sentence_report_file(psr_id=psr_id)

    # upload the file to Delius
    response = delius_api_service.put_pre_sentence_report(crn=crn, psr_id=psr_id, file=file)

    print(response.status_code)
    print(response.content)

    # handle the response - error response - reprocess message?
    return response == 201
