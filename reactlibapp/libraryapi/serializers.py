from django.contrib.auth.models import User
from libraryapp.models import Book, Author, GoogleUser, Review, History,\
    Category, Interest

from rest_framework import serializers


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
