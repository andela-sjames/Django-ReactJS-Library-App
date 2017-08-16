"""Production specific settings."""
from .base import *

# Parse database configuration from $DATABASE_URL
import dj_database_url

DEBUG = False

DATABASES = {
    'default': dj_database_url.config()
}

DATABASES['default']['ENGINE'] = 'django_postgrespool'

ALLOWED_HOSTS = ['*']

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
