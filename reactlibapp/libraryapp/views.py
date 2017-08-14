
from django.views.generic.base import TemplateView, View
from django.http import (
    HttpResponse,
    HttpResponseNotAllowed,
    HttpResponseRedirect)
from django.core.urlresolvers import reverse_lazy
from django.contrib.auth.models import User
from django.contrib.auth import login

from .models import GoogleUser


class GoogleLoginView(View):


    def get(self, request, *args, **kwargs):

        user_id = request.GET['sub']
        try:
            google_user = GoogleUser.objects.get(google_id=user_id)
            user = User.objects.get(id=google_user.app_user.id)
            user.backend = 'django.contrib.auth.backends.ModelBackend'
            login(request, user)

            return HttpResponse("success", content_type="text/plain")

        except GoogleUser.DoesNotExist:

            if 'hd' not in request.GET:
                return HttpResponseNotAllowed("Invalid parameters given")

            if request.GET['hd'] != 'andela.com' and \
                request.GET['iss'] != "accounts.google.com" and \
                request.GET['email_verified'] != "true" and \
                request.GET['aud'] != "450087630844-n6lfapnuddba615f4kqsuo4b9tontsd6.apps.googleusercontent.com":

                return HttpResponseNotAllowed("Invalid parameters given")

            # proceed to create the user
            appuser_picture = request.GET['picture']
            username = request.GET['name']

            # Create the user
            user = User(
                username=username,
                email=request.GET["email"],
                first_name=request.GET['given_name'],
                last_name=request.GET['family_name']
            )
            user.save()

            google_user = GoogleUser(google_id=user_id,
                                     app_user=user,
                                     appuser_picture=appuser_picture)

            user.backend = 'django.contrib.auth.backends.ModelBackend'

            google_user.save()

            login(request, user)
            return HttpResponse("success", content_type="text/plain")


class SPAView(TemplateView):

    template_name = 'libraryapp/main.html'