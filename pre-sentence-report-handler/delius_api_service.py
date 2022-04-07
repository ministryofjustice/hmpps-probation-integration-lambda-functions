import requests
import os
import auth
import boto3


session = boto3.Session(region_name="eu-west-2")
ssm = session.client("ssm")
auth_user = None
auth_pass = None


def put_pre_sentence_report(crn=None, psr_id=None, file=None):
    global auth_user
    global auth_pass
    if auth_user is None or auth_pass is None:
        auth_user = ssm.get_parameter(Name=os.getenv("OAUTH_CLIENT_ID_PARAMETER"), WithDecryption=True)["Parameter"]["Value"]
        auth_pass = ssm.get_parameter(Name=os.getenv("OAUTH_CLIENT_SECRET_PARAMETER"), WithDecryption=True)["Parameter"]["Value"]

    return requests.put(
            f'{os.getenv("DELIUS_API_BASE_URL")}/v1/offenders/{crn}/pre-sentence-reports/{psr_id}',
            headers={"accept": "application/json", "Authorization": "Bearer " + auth.get_auth_token(auth_user, auth_pass)},
            files=file)
