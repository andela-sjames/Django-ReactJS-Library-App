#!/bin/bash

# wait for Postgres to start
function postgres_ready() {
python << END
import sys
import psycopg2
try:
    conn = psycopg2.connect(dbname="postgres", user="postgres", password="postgres", host="postgres")
except psycopg2.OperationalError:
    sys.exit(-1)
sys.exit(0)
END
}

until postgres_ready; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done


# prepare init migration
su -m djangoreactapp -c "python manage.py makemigrations"  
# migrate db, so we have the latest db schema
su -m djangoreactapp -c "python manage.py migrate"  
# start development server on public ip interface, on port 8000
su -m djangoreactapp -c "python manage.py runserver 0.0.0.0:8000" 