from django.contrib import admin

from libraryapp.models import Users, Authors, Books, Reviews, History


class BooksAdmin(admin.ModelAdmin):
    """Books admin class defined."""

    search_fields = ['^title', '^description']
    raw_id_fields = ('author',)
    date_hierarchy = 'created_at'

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
            'fields': ('author')
        }),
    )


class UsersAdmin(admin.ModelAdmin):
    """User admin model class defined."""

    date_hierarchy = 'created_at'

    fieldsets = (
        ('None', {
            'fields': ('name', 'email', 'role')
        }),
        ('Time Info', {
            'fields': ('created_at', 'updated_at')
        }),
    )


class AuthorsAdmin(admin.ModelAdmin):
    """Author admin model class defined."""

    date_hierarchy = 'created_at'

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

    fieldsets = (
        ('Status', {
            'fields': ('returned')
        }),
        ('Time Info', {
            'fields': ('created_at', 'updated_at', 'lending_date',
                       'return_date', 'exptdreturn_date')
        }),
        ("Relationship", {
            'fields': ('book', 'user')
        }),
    )


class ReviewsAdmin(admin.ModelAdmin):
    """Review admin model class defined."""

    date_hierarchy = 'created_at'

    fieldsets = (
        (None, {
            'fields': ('comment')
        }),
        ('Time Info', {
            'fields': ('created_at', 'updated_at',)
        }),
        ("Relationship", {
            'fields': ('book', 'user')
        }),
    )


admin.site.register(Books, BooksAdmin)
admin.site.register(Users, UsersAdmin)
admin.site.register(Authors, AuthorsAdmin)
admin.site.register(History, HistoryAdmin)
admin.site.register(Reviews, ReviewsAdmin)
