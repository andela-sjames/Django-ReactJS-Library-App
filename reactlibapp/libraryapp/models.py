from __future__ import unicode_literals

from django.db import models


class BaseInfo(models.Model):
    """Base class containing all models common information."""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """Define Model as abstract."""

        abstract = True


class Users(BaseInfo):
    """User model defined."""

    USER_ROLE = (
        ('A', 'Admin'),
        ('U', 'User'),
    )

    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    role = models.CharField(max_length=2, choices=USER_ROLE)


class Authors(BaseInfo):
    """Book author models defined."""

    name = models.CharField(max_length=200)


class Books(BaseInfo):
    """Book model defined."""

    title = models.CharField(max_length=100)
    description = models.TextField()
    quantity = models.IntegerField()
    edition = models.CharField(max_length=100)
    publisher = models.CharField(max_length=100)
    isbn = models.CharField(max_length=50)
    author = models.ForeignKey('Authors',
                               related_name="myauthor",
                               on_delete=models.CASCADE)

    def _check_status(self):
        if self.quantity <= 0:
            return "Not Available"
        else:
            return "Available"
    status = property(_check_status)


class Reviews(BaseInfo):
    """Book review model defined."""

    comment = models.TextField()
    # ratings needs to be implemented here.
    user = models.ForeignKey('Users',
                             related_name="myuser",
                             on_delete=models.CASCADE)
    book = models.ForeignKey('Books',
                             related_name="mybook",
                             on_delete=models.CASCADE)


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

    book = models.ForeignKey('Books',
                             related_name="mybook",
                             on_delete=models.CASCADE)
    user = models.ForeignKey('Users',
                             related_name="myuser",
                             on_delete=models.CASCADE)
