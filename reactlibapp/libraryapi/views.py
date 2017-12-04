from django.http import Http404
from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework import status
from rest_framework import filters
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.generics import GenericAPIView, ListAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAuthenticated

from libraryapi.setpagination import LimitOffsetpage
from libraryapi.models import (
    Category, Author, 
    Book, History, 
    Interest, Quote, 
    GoogleUser, UserProxy)
from libraryapi.serializers import (
    CategorySerializer, AuthorSerializer, 
    BookSerializer, HistorySerializer, 
    InterestSerializer, QuoteSerializer, 
    GoogleUserSerializer, UserSerializer)

from libraryapi.models import GoogleUser
from libraryapi.utils import resolve_google_oauth


class GoogleRegisterView(APIView):
    
    permission_classes = (AllowAny,)

    def get_oauth_token(self, userproxy):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(userproxy)
        token = jwt_encode_handler(payload)

        serializer = UserSerializer(userproxy)

        body = {
            'token': token,
            'user': serializer.data,
        }

        return body

    def post(self, request, format=None):
        
        idinfo = resolve_google_oauth(request)

        # check if it is a returning user.
        try:
            google_user = GoogleUser.objects.get(google_id=idinfo['sub'])
            google_user.check_diff(idinfo)
            userproxy = UserProxy.objects.get(id=google_user.app_user.id)
            userproxy.check_diff(idinfo)

        except GoogleUser.DoesNotExist:
            # proceed to create the user

            userproxy = UserProxy(
                username=idinfo['name'],
                email=idinfo["email"],
                first_name=idinfo['given_name'],
                last_name=idinfo['family_name']
            )
            userproxy.save()
            google_user = GoogleUser(google_id=idinfo['sub'],
                                     app_user=userproxy,
                                     appuser_picture=idinfo['picture'])
            google_user.save()

        # automatically get token for the created/returning user and log them in:
        body = self.get_oauth_token(userproxy)
        return Response(body, status=status.HTTP_201_CREATED)


class GoogleUserView(GenericAPIView):
    """List Google User by Id."""

    model = GoogleUser
    serializer_class = GoogleUserSerializer

    def get(self, request):
        # import pdb;pdb.set_trace()
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
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)
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
