
from django.views.generic.base import TemplateView, View
from django.http import (
    HttpResponse,
    HttpResponseNotAllowed,
    HttpResponseRedirect)
from django.core.urlresolvers import reverse_lazy
from django.contrib.auth.models import User
from django.contrib.auth import login


class SPAView(TemplateView):

    template_name = 'libraryapp/main.html'