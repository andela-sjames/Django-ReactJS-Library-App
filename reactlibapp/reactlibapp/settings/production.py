"""Production specific settings."""
import os

from .base import *

# Parse database configuration from $DATABASE_URL
import dj_database_url

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

DATABASES = {
    'default': dj_database_url.config()
}

DEBUG = False

db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(db_from_env)

DATABASES['default']['ENGINE'] = 'django.db.backends.postgresql_psycopg2'

ALLOWED_HOSTS = ['*']

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

TEMPLATES[0]['DIRS'] = [os.path.join(BASE_DIR, 'assets')]
