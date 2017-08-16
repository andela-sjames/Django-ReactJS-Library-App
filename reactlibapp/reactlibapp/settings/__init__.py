"""Define settings using values of environment variables."""

import dotenv

dotenv.load()

if dotenv.get('HEROKU'):
    from .production import *
else:
    from .development import *
