import requests
import os


def get_auth_token(auth_user, auth_pass):
    auth_root = os.getenv("OAUTH_BASE_URL")
    auth_url = auth_root + "/oauth/token?grant_type=client_credentials"

    headers = {
        "accept": "application/json",
        "Content-Type": "application/json",
    }

    response = requests.post(auth_url, auth=(auth_user, auth_pass), headers=headers)
    token = response.json()["access_token"]

    return token
