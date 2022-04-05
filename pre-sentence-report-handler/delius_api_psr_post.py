import requests
import os
import auth
import boto3


session = boto3.Session(region_name="eu-west-2")
ssm = session.client("ssm")

# Authentication parameters
auth_user = ssm.get_parameter(
    Name=os.getenv("OAUTH_CLIENT_ID_PARAMETER"), WithDecryption=True
)["Parameter"]["Value"]
auth_pass = ssm.get_parameter(
    Name=os.getenv("OAUTH_CLIENT_SECRET_PARAMETER"), WithDecryption=True
)["Parameter"]["Value"]


def post_psr(crn=None, court_report_id=None, file=None):

    token = auth.get_auth_token(auth_user, auth_pass)
    service_root = os.getenv("DELIUS_API_BASE_URL")

    delius_api_url = (
        service_root
        + "/v1/offenders/"
        + crn
        + "/courtReport/"
        + court_report_id
        + "/documents/"
    )
    # delius_api_url = service_root + '/v1/offenders/' + crn + '/psr-courtReport/123-123/documents/'

    headers = {"accept": "application/json", "Authorization": "Bearer " + token}

    return requests.post(delius_api_url, files=file, headers=headers)
