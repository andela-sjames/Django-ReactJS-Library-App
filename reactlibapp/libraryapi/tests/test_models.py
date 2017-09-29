from django.test import TestCase, Client
from django.contrib.auth.models import User
import libraryapi.models as models


class ModelSetupTestCase(TestCase):
    def setUp(self):
        self.client = Client()

        User.objects.create(
            first_name='John',
            last_name='doe',
            username='johndoe',                                                                                                                 
            email='johndoe@doe.com')

        author = models.Author.objects.create(
            name='Chinua Achebe'
        )

        my_author = models.Author.objects.get(name="Chinua Achebe")
        category = models.Category.objects.create(
            name='Fiction'
        )
        # cate = models.Category.objects.get(name='Fiction')
        # import pdb; pdb.set_trace()
        # models.Book.objects.create(
        #     title="Ade in kukuvi land",
        #     description='The adventure of Ade, son of Baba',
        #     category=category,
        #     quantity=4,
        #     edition='first edition',
        #     publisher='Amity publishers',
        #     isbn='4994-993-FGTS-8MF',
        #     author=my_author
        # )
        # self.google_user = models.GoogleUser.objects.create(
        #     facebook_id=1,
        #     contrib_user=self.user)


class TestUserCreation(ModelSetupTestCase):
    def test_user_model_exist(self):
        users = User.objects.all()
        self.assertTrue(users.exists())

    def test_user_has_necessary_fields(self):
        necessary_fileds = ['first_name', 'last_name', 'username', 'email']
        all_fields = [field.name for field in User._meta.get_fields()]
        for field in necessary_fileds:
            self.assertIn(field, all_fields)

    def test_user_is_created(self):
        john = User.objects.get(first_name='John')
        self.assertEqual(john.first_name, 'John')
        self.assertEqual(john.last_name, 'doe')
        self.assertEqual(john.username, 'johndoe')
        self.assertEqual(john.email, 'johndoe@doe.com')

    def test_user_does_not_exist(self):
        with self.assertRaises(User.DoesNotExist):
            User.objects.get(first_name='Mark')


class TestAuthorCreation(ModelSetupTestCase):
    def test_author_model_exist(self):
        authors = models.Author.objects.all()
        self.assertTrue(authors.exists())

    def test_author_has_necessary_fiels(self):
        fields = ['name']
        for field in fields:
            self.assertIn(field, fields)

    def test_author_does_not_exist(self):
        with self.assertRaises(models.Author.DoesNotExist):
            models.Author.objects.get(name='John Sherry')

    def test_author_created(self):
        chinua = models.Author.objects.get(name='Chinua Achebe')
        self.assertEqual(chinua.name, 'Chinua Achebe')


class TestCategoryCreation(ModelSetupTestCase):
    def test_category_model_exist(self):
        categories = models.Category.objects.all()
        self.assertTrue(categories.exists())

    def test_category_has_necessary_fiels(self):
        fields = ['name']
        for field in fields:
            self.assertIn(field, fields)

    def test_category_does_not_exist(self):
        with self.assertRaises(models.Category.DoesNotExist):
            models.Category.objects.get(name='John Sherry')

    def test_category_created(self):
        chinua = models.Category.objects.get(name='Fiction')
        self.assertEqual(china.name, 'Fiction')
