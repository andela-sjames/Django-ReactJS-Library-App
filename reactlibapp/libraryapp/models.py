from __future__ import unicode_literals

from django.db import models


class BaseInfo(models.Model):
    """Base class containing all models common information."""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
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
    edition = models.CharField(max_length=100)
    publisher = models.CharField(max_length=100)
    description = models.TextField()
    isbn = models.CharField(max_length=50)
    quantity = models.CharField(max_length=10)
    status = models.CharField(max_length=100) # add status based on qty
    author = models.ForeignKey('Authors',
                               related_name="myauthor",
                               on_delete=models.CASCADE)


class Reviews(BaseInfo):
    """Book review model defined."""

    comment = models.TextField()
    user = models.ForeignKey('Users',
                             related_name="myuser",
                             on_delete=models.CASCADE)
    book = models.ForeignKey('Books',
                             related_name="mybook",
                             on_delete=models.CASCADE)


class History(BaseInfo):
    """User history model defined."""

    lending_date = models.DateTimeField(auto_now_add=True)
    expreturn_date = models.DateTimeField(auto_now_add=False,
                                          auto_now=False, blank=False)  # increment by 14 days
    return_date = models.DateTimeField(auto_now_add=False,
                                       auto_now=False, blank=True, null=True)
    status = models.CharField(max_length=100)
    book = models.ForeignKey('Books',
                             related_name="mybook",
                             on_delete=models.CASCADE)
    user = models.ForeignKey('Users',
                             related_name="myuser",
                             on_delete=models.CASCADE)
