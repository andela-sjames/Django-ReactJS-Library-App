from django.utils.functional import SimpleLazyObject
from django.contrib.auth.models import AnonymousUser

from rest_framework.request import Request
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


def jwt_authentication_middleware(get_response):
    def middleware(request):
        user = None
        try:
            user_jwt = JSONWebTokenAuthentication().authenticate(Request(request))    
            user = user_jwt[0]
            request.user = request._cached_user = user
        except Exception as e:
            pass

        return get_response(request)
    return middleware
