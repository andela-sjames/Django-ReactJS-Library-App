
from django.http import Http404
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework import filters
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView, ListAPIView

from libraryapi.setpagination import LimitOffsetpage
from libraryapp.models import Category, Author, Book, History, Interest, Quote, GoogleUser
from libraryapi.serializers import CategorySerializer, AuthorSerializer, BookSerializer,\
    HistorySerializer, InterestSerializer, QuoteSerializer, GoogleUserSerializer


class GoogleUserView(GenericAPIView):
    """List Google User by Id."""

    model = GoogleUser
    serializer_class = GoogleUserSerializer

    def get(self, request):
        id = self.request.user.id
        app_user = User.objects.get(id=id)
        try:
            google_user = GoogleUser.objects.get(app_user=app_user)
        except GoogleUser.DoesNotExist:
            raise Http404

        serializer = GoogleUserSerializer(google_user)
        return Response(serializer.data)


class CategoryListView(ListAPIView):
    """List all Categories."""

    model = Category
    serializer_class = CategorySerializer
    pagination_class = LimitOffsetpage
    filter_fields = ('name',)
    queryset = Category.objects.all()


class AuthorListView(ListAPIView):
    """List all Authors."""

    model = Author
    serializer_class = AuthorSerializer
    pagination_class = LimitOffsetpage
    filter_fields = ('name',)
    queryset = Author.objects.all()


class BookListView(ListAPIView):
    """List all books."""

    model = Book
    serializer_class = BookSerializer
    pagination_class = LimitOffsetpage
    # filter_fields = ()
    queryset = Book.objects.all()


class HistoryListView(ListAPIView):
    """List all history belonging to a particular user."""

    model = History
    serializer_class = HistorySerializer
    pagination_class = LimitOffsetpage
    # filter_fields = ()

    def get_queryset(self):
        """
        This view should return a list for
        the currently authenticated user's history.
        """
        quser = self.request.user.id
        queryset = History.objects.filter(user=quser)

        return queryset


class InterestListView(ListAPIView):
    """List all users interest in a book."""

    model = Interest
    serializer_class = InterestSerializer
    pagination_class = LimitOffsetpage
    # filter_fields = ()

    def get_queryset(self):
        """
        This view should return a list for
        the currently authenticated user's interest.
        """
        quser = self.request.user.id
        queryset = Interest.objects.filter(user=quser)

        return queryset


class QuotesListView(ListAPIView):
    """List all quotes and respective authors."""

    model = Quote
    serializer_class = QuoteSerializer
    queryset = Quote.objects.all()
    pagination_class = LimitOffsetpage
    filter_fields = ('author', 'statement')
