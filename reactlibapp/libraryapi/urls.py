# resources: https://getblimp.github.io/django-rest-framework-jwt/
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from libraryapi import views


from rest_framework_jwt.views import (
    refresh_jwt_token, 
    verify_jwt_token, 
    obtain_jwt_token)



urlpatterns = [
    url(r'^appuser/$', views.GoogleUserView.as_view(),
        name='app_user'),

    url(r'^auth/register/$', views.GoogleRegisterView.as_view(),
        name='auth_register'),

    url(r'^auth/refresh/$', refresh_jwt_token,
        name='auth_refresh'),

    url(r'^auth/verify/', verify_jwt_token,
        name='auth_verify'),

    url(r'^categories/$', views.CategoryListView.as_view(),
        name='apicategory'),

    url(r'^authors/$', views.AuthorListView.as_view(),
        name='apiauthors'),

    url(r'^books/$', views.BookListView.as_view(),
        name='apibooks'),

    url(r'^history/$', views.HistoryListView.as_view(),
        name='apihistory'),

    url(r'^interest/$', views.InterestListView.as_view(),
        name='api_interest'),

    url(r'^quotes/$', views.QuotesListView.as_view(),
        name='apiquotes'),

]


urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'html'])
