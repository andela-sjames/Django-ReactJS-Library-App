import dotenv
dotenv.load()

from oauth2client import client
from rest_framework.response import Response

def resolve_google_oauth(request):
    # token should be passed as an object {'idtoken' : id_token }
    # to this view
    token = request.GET['idtoken']
    CLIENT_ID = dotenv.get('CLIENT_ID')

    try:
        idinfo = client.verify_id_token(token, CLIENT_ID)

        if 'hd' not in idinfo:
            return Response("Invalid parameters given") # this should be handled later

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            return Response("Wrong issuer.")

        if idinfo['hd'] != 'andela.com' and \
            idinfo['email_verified'] != "true" and \
            idinfo['aud'] != CLIENT_ID:

            return Response("Invalid parameters given") # this should be handled later

    except crypt.AppIdentityError:
        return Response("Invalid Token")


    return idinfo
