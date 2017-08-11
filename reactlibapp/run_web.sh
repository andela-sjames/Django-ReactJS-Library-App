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

export SECRET_KEY=django-react-library-app
export DB_USER=postgres
export DB_PASS=postgres
export DB_SERVICE=postgres
export DB_PORT=5432
export DB_NAME=postgres

# Start app
./launch.sh
