from django.contrib.auth.models import User
from libraryapp.models import Book, Author, GoogleUser, Ratings, History,\
    Category, Interest, Quote

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """User Model serializer class."""

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class GoogleUserSerializer(serializers.ModelSerializer):
    """GoogleUser Model serializer class."""

    class Meta:
        model = GoogleUser
        fields = ('google_id', 'app_user', 'appuser_picture')
        depth = 1


class AuthorSerializer(serializers.ModelSerializer):
    """Author Model serializer class."""

    class Meta:
        model = Author
        fields = ('name', )


class CategorySerializer(serializers.ModelSerializer):
    """Category Model serializer class."""

    class Meta:
        model = Category
        fields = ('name', )


class BookSerializer(serializers.ModelSerializer):
    """Book Model serializer class."""

    author = AuthorSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ('title', 'description', 'quantity', 'edition', 'status', 'publisher',
                  'isbn', 'author', 'category')
        depth = 1


class RatingSerializer(serializers.ModelSerializer):
    """Ratings Model Serializer class."""

    user = UserSerializer(many=True, read_only=True)
    book = BookSerializer(many=True, read_only=True)

    class Meta:
        # model = Ratings
        fields = ('comment', 'user', 'book', 'score')


class InterestSerializer(serializers.ModelSerializer):
    """Interest Model serializer class."""

    user = UserSerializer(many=True, read_only=True)
    book = BookSerializer(many=True, read_only=True)

    class Meta:
        model = Interest
        fields = ('done', 'user', 'book')


class HistorySerializer(serializers.ModelSerializer):
    """History Model serializer class."""

    user = UserSerializer(many=True, read_only=True)
    book = BookSerializer(many=True, read_only=True)

    class Meta:
        model = History
        fields = ('lending_date', 'return_date',
                  'returned', 'exptdreturn_date', 'book', 'user')


class QuoteSerializer(serializers.ModelSerializer):
    """Quotes  Model serializer class."""

    class Meta:
        model = Quote
        fields = ("author", "statement")
