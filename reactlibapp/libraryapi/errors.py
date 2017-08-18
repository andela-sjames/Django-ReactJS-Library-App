from rest_framework import status
from rest_framework.response import Response

def unauthorized(message):
    ''' User is unauthorised to perform action.'''
    body = {'status': 401, 'error': 'unauthorized', 'message': message}
    return Response(body, status=status.HTTP_401_UNAUTHORIZED)

def bad_request(message):
    '''Request is bad and not valid '''
    body = {'status': 400, 'error': 'bad request', 'message': message}
    return Response(body, status=status.HTTP_400_BAD_REQUEST)

def not_allowed():
    '''Method not allowed'''
    body = {'status': 405, 'error': 'method not allowed'}
    return Response(body, status=status.HTTP_405_METHOD_NOT_ALLOWED)

def forbidden(message):
    '''Forbidden request'''
    body = {'status': 403, 'error': 'forbidden', 'message': message}
    return Response(body, status=status.HTTP_403_FORBIDDEN)

def not_found(message):
    '''Not found error'''
    body = {'status': 404, 'error': 'not found', 'message': message}
    return Response(body, status=status.HTTP_404_NOT_FOUND)

def unprocessable_entity(message):
    '''Can't process this entity'''
    body = {'status': 422, 'error': 'unprocessable entity', 'message': message}
    return Response(body, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
