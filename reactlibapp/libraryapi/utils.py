import dotenv
dotenv.load()

from oauth2client import client
from rest_framework.response import Response

from libraryapi.errors import not_allowed, unauthorized

def resolve_google_oauth(request):
    # token should be passed as an object {'idtoken' : id_token }
    # to this view
    token = request.GET['idtoken']
    CLIENT_ID = dotenv.get('CLIENT_ID')

    try:
        idinfo = client.verify_id_token(token, CLIENT_ID)

        if 'hd' not in idinfo:
            return not_allowed()

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            return unauthorized('Wrong Issuer')

        if idinfo['hd'] != 'andela.com' and \
            idinfo['email_verified'] != "true" and \
            idinfo['aud'] != CLIENT_ID:

            return unauthorized("Invalid parameters given")

    except crypt.AppIdentityError:
        return unauthorized("Invalid Token")


    return idinfo
