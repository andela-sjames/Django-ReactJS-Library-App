from django.test import TestCase, Client
from django.contrib.auth.models import User
import libraryapi.models as models


class ModelSetupTestCase(TestCase):
    def setUp(self):
        self.client = Client()

        user = User.objects.create(
            first_name='John',
            last_name='Doe',
            username='johndoe',
            email='johndoe@doe.com')

        author = models.Author.objects.create(
            name='Chinua Achebe'
        )

        my_author = models.Author.objects.get(name="Chinua Achebe")
        category = models.Category.objects.create(
            name='Fiction'
        )

        book = models.Book.objects.create(
            title="Ade in kukuvi land",
            description='The adventure of Ade, son of Baba',
            category=category,
            quantity=4,
            edition='first edition',
            publisher='Amity publishers',
            isbn='4994-993-FGTS-8MF'
        )

        my_book = models.Book.objects.get(pk=1)
        my_book.author.add(my_author)

        rating = models.Ratings.objects.create(
          comment="This book is nice",
          score=4,
          user=user,
          book=book,

        )

        history = models.History.objects.create(
          book=book,
          user=user
        )
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
        self.assertEqual(john.last_name, 'Doe')
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
        necessary_fileds = ['name']
        all_fields = [field.name for field in models.Author._meta.get_fields()]
        for field in necessary_fileds:
            self.assertIn(field, all_fields)

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
        necessary_fileds = ['name']
        all_fields = [field.name for field in models.Category._meta.get_fields()]
        for field in necessary_fileds:
            self.assertIn(field, all_fields)

    def test_category_does_not_exist(self):
        with self.assertRaises(models.Category.DoesNotExist):
            models.Category.objects.get(name='John Sherry')

    def test_category_created(self):
        chinua = models.Category.objects.get(name='Fiction')
        self.assertEqual(chinua.name, 'Fiction')


class TestBookCreation(ModelSetupTestCase):
    def test_book_model_exist(self):
        books = models.Book.objects.all()
        self.assertTrue(books.exists())

    def test_book_has_necessary_fiels(self):
        necessary_fileds = ['title', 'description', 'quantity', 'edition', 'publisher', 'isbn', 'author', 'category']
        all_fields = [field.name for field in models.Book._meta.get_fields()]
        for field in necessary_fileds:
            self.assertIn(field, all_fields)

    def test_book_created_with_valid_author(self):
        my_book = models.Book.objects.get(pk='1')
        self.assertEqual(my_book.title, 'Ade in kukuvi land')
        # self.assertEqual(my_book.author, 'Chinua Achebe')

    def test_category_does_not_exist(self):
        with self.assertRaises(models.Book.DoesNotExist):
            models.Book.objects.get(title='Rich Dad, Poor Dad')


class TestRatingsCreation(ModelSetupTestCase):
    def test_book_model_exist(self):
        ratings = models.Ratings.objects.all()
        self.assertTrue(ratings.exists())

    def test_book_has_necessary_fiels(self):
        necessary_fileds = ['comment', 'score', 'user', 'book']
        all_fields = [field.name for field in models.Ratings._meta.get_fields()]
        for field in necessary_fileds:
            self.assertIn(field, all_fields)

    def test_Ratings_created_with_valid_author(self):
        my_ratings = models.Ratings.objects.get(pk='1')
        self.assertEqual(my_ratings.comment, 'This book is nice')
        self.assertEqual(my_ratings.score, 4)

    def test_category_does_not_exist(self):
        with self.assertRaises(models.Ratings.DoesNotExist):
            models.Ratings.objects.get(book=8)


class TestHistoryCreation(ModelSetupTestCase):
    def test_history_model_exist(self):
        history = models.History.objects.all()
        self.assertTrue(history.exists())

    def test_history_has_necessary_fiels(self):
        necessary_fileds = ['book', 'user']
        all_fields = [field.name for field in models.History._meta.get_fields()]
        for field in necessary_fileds:
            self.assertIn(field, all_fields)

    def test_history_created(self):
        my_history = models.History.objects.get(pk='1')
        self.assertEqual(my_history.user.first_name, 'John')
        self.assertEqual(my_history.user.last_name, 'Doe')
        self.assertEqual(my_history.book.category.name, 'Fiction')

    def test_history_does_not_exist(self):
        with self.assertRaises(models.History.DoesNotExist):
            models.History.objects.get(book=5)
