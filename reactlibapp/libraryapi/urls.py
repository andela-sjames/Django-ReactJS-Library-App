from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from libraryapi import views, usertoken


urlpatterns = [
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
]


urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'html'])
