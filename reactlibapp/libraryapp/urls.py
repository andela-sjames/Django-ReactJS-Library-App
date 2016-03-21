from django.conf.urls import url
from libraryapp import views


urlpatterns = [

    url(r'^user/verify/$',
        views.GoogleLoginView.as_view(),
        name='verify'
        ),

    url(r'^user/dashboard/$',
        views.DashBoardView.as_view(),
        name='dashboard'
        ),

]
