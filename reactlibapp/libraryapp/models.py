from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class BaseInfo(models.Model):
    """Base class containing all models common information."""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """Define Model as abstract."""

        abstract = True


class GoogleUser(models.Model):
    google_id = models.CharField(max_length=60, unique=True)

    app_user = models.OneToOneField(User, related_name='user',
                                    on_delete=models.CASCADE)
    appuser_picture = models.TextField()

    def __unicode__(self):
        return "%s - %s" % (self.contrib_user.first_name,
                            self.contrib_user.last_name)


class Author(BaseInfo):
    """Book author models defined."""

    name = models.CharField(max_length=200)

    def __unicode__(self):
        return "{}" .format(self.name)


class Book(BaseInfo):
    """Book model defined."""

    title = models.CharField(max_length=100)
    description = models.TextField()
    quantity = models.IntegerField()
    edition = models.CharField(max_length=100)
    publisher = models.CharField(max_length=100)
    isbn = models.CharField(max_length=50)
    author = models.ForeignKey('Author', on_delete=models.CASCADE)

    def _check_status(self):
        if self.quantity <= 0:
            return "Not Available"
        else:
            return "Available"
    status = property(_check_status)

    def __unicode__(self):
        return "Book title: {}" .format(self.title)


class Review(BaseInfo):
    """Book review model defined."""

    comment = models.TextField()
    # ratings needs to be implemented here.
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey('Book', on_delete=models.CASCADE)

    def __unicode__(self):
        return "Review by user : {}" .format(self.user)


class History(BaseInfo):
    """User history model defined."""

    lending_date = models.DateTimeField(auto_now_add=True)
    return_date = models.DateTimeField(auto_now_add=False,
                                       auto_now=False,
                                       blank=True, null=True)
    returned = models.BooleanField(default=False)

    def _expected_return_date(self):
        import datetime
        present_day = datetime.date.today()
        day_14 = datetime.timedelta(weeks=2)
        return_date = present_day + day_14
        return return_date

    exptdreturn_date = property(_expected_return_date)

    book = models.ForeignKey('Book', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __unicode__(self):
        return "History for user : {}" .format(self.user)
