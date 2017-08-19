import os, sys

# Production specific settings
from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

if 'test' in sys.argv:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'test.sqlite3'),
        }
    }
else:
    DATABASES = {
     'default': {
          'ENGINE': 'django.db.backends.postgresql_psycopg2',
          'NAME': os.environ.get('DB_NAME'),
          'USER': os.environ.get('DB_USER'),
          'PASSWORD': os.environ.get('DB_PASS'),
          'PORT': os.environ.get('DB_PORT'),
          'TEST': {
            'CHARSET': None, 
            'COLLATION': None,
            'NAME': os.path.join(os.path.dirname(__file__), 'test.db'), 
            'MIRROR': None
          }
      },
 }