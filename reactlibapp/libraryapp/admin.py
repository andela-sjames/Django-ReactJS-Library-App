from django.contrib import admin
from libraryapp.models import Author, Book, Review, History, GoogleUser


class BooksAdmin(admin.ModelAdmin):
    """Books admin class defined."""

    search_fields = ['^title', '^description']
    raw_id_fields = ('author',)
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'quantity')
        }),
        ("Publisher's detail", {
            'classes': ('collapse', 'extrapretty'),
            'fields': ('edition', 'publisher', 'isbn'),
        }),
        ('Time Info', {
            'fields': ('created_at', 'updated_at')
        }),
        ("Relationship", {
            'fields': ('author',)
        })
    )


class AuthorsAdmin(admin.ModelAdmin):
    """Author admin model class defined."""

    search_fields = ['^name']
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('None', {
            'fields': ('name',)
        }),
        ('Time Info', {
            'fields': ('created_at', 'updated_at')
        }),
    )


class HistoryAdmin(admin.ModelAdmin):
    """History admin model class defined."""

    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'updated_at', 'lending_date',
                       'exptdreturn_date')

    fieldsets = (
        ('Status', {
            'fields': ('returned',)
        }),
        ('Time Info', {
            'fields': ('created_at', 'updated_at', 'lending_date',
                       'return_date', 'exptdreturn_date')
        }),
        ("Relationship", {
            'fields': ('book', 'user')
        })
    )


class ReviewsAdmin(admin.ModelAdmin):
    """Review admin model class defined."""

    search_fields = ['^comment']
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('comment',)
        }),
        ('Time Info', {
            'fields': ('created_at', 'updated_at',)
        }),
        ("Relationship", {
            'fields': ('book', 'user',)
        })
    )


class GoogleUserAdmin(admin.ModelAdmin):
    """Google user admin model class defined."""

    fieldsets = (
        ("Basic Information", {
            'fields': ('google_id', 'appuser_picture',)
        }),
        ("Relationship", {
            'fields': ('app_user',)
        })
    )


admin.site.register(Book, BooksAdmin)
admin.site.register(Author, AuthorsAdmin)
admin.site.register(Review, ReviewsAdmin)
admin.site.register(History, HistoryAdmin)
admin.site.register(GoogleUser, GoogleUserAdmin)
