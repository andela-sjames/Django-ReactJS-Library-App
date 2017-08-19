from libraryapi.serializers import UserSerializer


def jwt_response_payload_handler(token, user=None, request=None):
    """
    Returns custom response data for both the login and refresh views.
    The data includes the token as well as includes the serialized 
    representation of the User.
    """
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
