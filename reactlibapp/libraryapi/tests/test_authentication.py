'''Script used to test authentication of API views.'''

from rest_framework.test import APIClient
from rest_framework import status
from rest_framework.test import APITestCase

from django.core.urlresolvers import reverse_lazy
from django.contrib.auth.models import User

from libraryapi.views import GoogleRegisterView



class ApiRegistrationTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_auth_register_resolves_to_correct_view(self):
        data = {'ID_Token' : 'dummy_id_token' }
        url=reverse_lazy('auth_register')
        response=self.client.post(url, data, format='json')
        self.assertEqual(
            response.resolver_match.func.__name__,
            GoogleRegisterView.as_view().__name__
        )
