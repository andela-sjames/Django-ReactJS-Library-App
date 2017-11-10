#!/bin/bash

read -d '' HELP_STRING <<'EOF'
  "Script used to create DB_USER, DB_PASS and DB_NAME for your app."
  Usage:
    ./createdb.sh <dbname/username>

  Application:
    The argument passed to the script creates a user
    with the argument as the user and also as the database name

    Your .env variable should look like this

    DB_USER=reactlibapp
    DB_PASS=reactlibapp
    DB_PORT=5432
    DB_NAME=reactlibapp

    where reactlibapp is the argument passed to the shell script.

    example:
      ./createdb.sh reactlibapp


    Shell Displays this:
      ./createdb.sh reactlibapp
      Enter password for new role: (not displayed) reactlibapp
      Enter it again: (not displayed) reactlibapp
      CREATE ROLE reactlibapp PASSWORD 'md523979cec4152758c460ce352458f8de9' SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN;
      Password: (not displayed) reactlibapp
EOF


if [[ $# -eq 0 ]]; then
    echo 'Please provide a single argument for the username/dbname'
    echo "$HELP_STRING"
elif
    [ "$#" -ne 1 ]; then
    echo 'Please provide just one argument as the username'
    echo "$HELP_STRING"
else
    USERNAME_DBNAME=$1
    createuser -P -s -e $USERNAME_DBNAME
    createdb --username=$USERNAME_DBNAME --owner=$USERNAME_DBNAME -W $USERNAME_DBNAME
fi
