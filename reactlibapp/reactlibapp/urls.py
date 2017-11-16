"""reactlibapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from rest_framework_swagger.views import get_swagger_view

from libraryapp import views

schema_view = get_swagger_view(title='Library App API')


urlpatterns = [
    url(r'^xyz-admin/', include(admin.site.urls)),
    url(r'^$', views.SPAView.as_view(), name='homepage'),
    url(r'^libraryapp/', include('libraryapp.urls')),
    url(r'^api/v1/', include('libraryapi.urls')),
]

urlpatterns += [
    url(r'^docs/$', schema_view),
]
