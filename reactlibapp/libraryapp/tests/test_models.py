from django.test import TestCase, Client
from django.contrib.auth.models import User


from libraryapp.models import GoogleUser, UserProxy


class ModelSetupTestCase(TestCase):

    def setUp(self):
        self.client = Client()

        self.user1 = User.objects.create(
            first_name='John',
            last_name='doe',
            username='Johndoe',
            email='johndoe@doe.com')

        self.user2 = UserProxy.objects.create(
            first_name='Johnny',
            last_name='doeson',
            username='Johndoeph',
            email='johndoeproxy@doe.com')

        # self.google_user1 = GoogleUser.objects.create(
        #     facebook_id=1,
        #     contrib_user=self.user1)


class TestUserCreation(ModelSetupTestCase):
    def test_user_exist(self):
        John = User.objects.get(first_name='John')
        self.assertTrue(John)

    def test_user_created(self):
        John = User.objects.get(first_name='John')
        self.assertEqual(John.first_name, 'John')
        self.assertEqual(John.last_name, 'doe')
        self.assertEqual(John.username, 'Johndoe')
        self.assertEqual(John.email, 'johndoe@doe.com')

    def test_userproxy_created(self):
        John = User.objects.get(first_name='Johnny')
        self.assertEqual(John.first_name, 'Johnny')
        self.assertEqual(John.last_name, 'doeson')
        self.assertEqual(John.username, 'Johndoeph')
        self.assertEqual(John.email, 'johndoeproxy@doe.com')
