from django.contrib.auth.models import User
from libraryapp.models import Book, Author, GoogleUser, Review, History,\
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
        fields = '__all__'
        exclude = ('created_at', 'updated_at')


class CategorySerializer(serializers.ModelSerializer):
    """Category Model serializer class."""

    class Meta:
        model = Category
        fields = '__all__'
        exclude = ('created_at', 'updated_at')


class BookSerializer(serializers.ModelSerializer):
    """Book Model serializer class."""

    author = AuthorSerializer(many=True, read_only=True)
    category = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ('title', 'description', 'quantiy', 'edition', 'publisher',
                  'isbn', 'author', 'category')
        exclude = ('created_at', 'updated_at')


class ReviewSerializer(serializers.ModelSerializer):
    """Review Model Serializer class."""

    user = UserSerializer(many=True, read_only=True)
    book = BookSerializer(many=True, read_only=True)

    class Meta:
        model = Review
        fields = ('comment', 'user', 'book')
        exclude = ('created_at', 'updated_at')


class InterestSerializer(serializers.ModelSerializer):
    """Interest Model serializer class."""

    user = UserSerializer(many=True, read_only=True)
    book = BookSerializer(many=True, read_only=True)

    class Meta:
        model = Interest
        fields = ('done', 'user', 'book')
        exclude = ('created_at', 'updated_at')


class HistorySerializer(serializers.ModelSerializer):
    """History Model serializer class."""

    user = UserSerializer(many=True, read_only=True)
    book = BookSerializer(many=True, read_only=True)

    class Meta:
        model = History
        fields = ('lending_date', 'return_date',
                  'returned', 'exptdreturn_date', 'book', 'user')
        exclude = ('created_at', 'updated_at')


class QuoteSerializer(serializers.ModelSerializer):
    """Quotes  Model serializer class."""

    class Meta:
        model = Quote
        fields = ("author", "statement")
