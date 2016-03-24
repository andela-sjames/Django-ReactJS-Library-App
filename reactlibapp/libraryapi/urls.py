from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from libraryapi import views, usertoken


urlpatterns = [
    url(r'^categories/$', views.CategoryList.as_view(),
        name='apicategory'),
]


urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'html'])
