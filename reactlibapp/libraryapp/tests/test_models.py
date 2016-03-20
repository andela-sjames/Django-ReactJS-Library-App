from django.test import TestCase, Client
from django.contrib.auth.models import User


from libraryapp.models import GoogleUser


class ModelSetupTestCase(TestCase):

    def setUp(self):
        self.client = Client()

        self.user1 = User.objects.create(
            first_name='John',
            last_name='doe',
            username='Johndoe',
            email='johndoe@doe.com')

        self.google_user1 = GoogleUser.objects.create(
            facebook_id=1,
            contrib_user=self.user1)


class TestUserCreation(ModelSetupTestCase):
    pass
