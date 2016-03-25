from django.http import Http404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework import filters

from libraryapp.models import Category
from libraryapi.serializers import CategorySerializer
from libraryapi.setpagination import LimitOffsetpage


class CategoryList(ListAPIView):
     """List all Categories."""

    model = Category
    serializer_class = CategorySerializer
    pagination_class = LimitOffsetpage
    filter_fields = ('name',)
    queryset = Category.objects.all()
