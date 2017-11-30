'''Script used to test authentication of API views.'''
import os
import mock

from django.test import TestCase, RequestFactory

from rest_framework import status
from rest_framework.test import APITestCase, APIClient, force_authenticate

from django.core.urlresolvers import reverse_lazy
from django.contrib.auth.models import User

from libraryapi.utils import resolve_google_oauth
from libraryapi.views import GoogleRegisterView

CLIENT_ID = os.environ.get('CLIENT_ID')


mock_valid_data = {
    # These six fields are included in all Google ID Tokens.
    "iss": "https://accounts.google.com",
    "sub": "110169484474386276334",
    "azp": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
    "aud": CLIENT_ID,
    "iat": "1433978353",
    "exp": "1433981953",

    # These seven fields are only included when the user has granted the "profile" and
    "email": "testuser@andela.com",
    "email_verified": True,
    "name": "Test User",
    "picture": "https://lh4.googleusercontent.com/-kYgzyAWpZzJ/ABCDEFGHI/AAAJKLMNOP/tIXL9Ir44LE/s99-c/photo.jpg",
    "given_name": "Test",
    "family_name": "User",
    "locale": "en",
    "hd": "andela.com"
}


class ApiRegistrationTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        data = {'ID_Token': 'dummy_id_token'}

        with mock.patch(
            'oauth2client.client.verify_id_token'
        ) as mock_resolve_g_auth:
            mock_resolve_g_auth.return_value = (mock_valid_data)

            url = reverse_lazy('auth_register')
            self.initial_response = self.client.post(url, data, format='json')
            self.token = self.initial_response.data['token']

    def test_auth_register_resolves_to_correct_view(self):
        data = {'ID_Token': 'dummy_id_token'}
        url = reverse_lazy('auth_register')
        response = self.client.post(url, data, format='json')
        self.assertEqual(
            response.resolver_match.func.__name__,
            GoogleRegisterView.as_view().__name__
        )

    def test_mock_google_G_suite_auth(self):
            self.assertEqual(self.initial_response.status_code, 201)

    def test_mock_invalid_google_G_suite_auth(self):
        data = {'ID_Token': 'dummy_id_token' }
        invalid_mock_data = {
            # These six fields are included in all Google ID Tokens.
            "iss": "https://accounts.google.com",
            "sub": "110169484474386276334",
            "azp": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
            "aud": CLIENT_ID,
            "iat": "1433978353",
            "exp": "1433981953",
            
            # These seven fields are only included when the user has granted the "profile" and
            "email": "testuser@themuse.com",
            "email_verified": False,
            "name" : "Test User",
            "picture": "https://lh4.googleusercontent.com/-kYgzyAWpZzJ/ABCDEFGHI/AAAJKLMNOP/tIXL9Ir44LE/s99-c/photo.jpg",
            "given_name": "Test",
            "family_name": "User",
            "locale": "en",
            "hd": "themuse.com"
        }

        with mock.patch('oauth2client.client.verify_id_token') as mock_resolve_g_auth:
            mock_resolve_g_auth.return_value = (
                invalid_mock_data
            )

            url = reverse_lazy('auth_register')
            response = self.client.post(url, data, format='json')
            self.assertEqual(
                response.status_code, 403
            )

    def test_request_middleware(self):
        url = reverse_lazy('apiauthors')
        response = self.client.get(url,
                                   HTTP_AUTHORIZATION='JWT {}'.format(self.token))
        self.assertEqual(
            response.wsgi_request.user.email, 'testuser@andela.com')
