from django.conf.urls import url
from libraryapp import views


urlpatterns = [

    url(r'^$', views.SPAView.as_view()),

]
