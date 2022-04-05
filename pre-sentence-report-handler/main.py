import delius_api_psr_post


def handler(event, context):
    # get these from the PSR event message
    crn = str(event["crn"])
    court_report_id = str(event["court_report_id"])

    # get the file from PSR service
    file_path = "dummy.pdf"
    file = {"fileData": open(file_path, "rb")}

    # call to delius api to upload the PSR file
    response = delius_api_psr_post.post_psr(
        crn=crn, court_report_id=court_report_id, file=file
    )

    print(response.status_code)
    print(response.content)

    # handle the response - error response - reprocess message?
    return response == 201
