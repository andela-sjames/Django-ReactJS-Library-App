#!/bin/bash

set -e 

function setup_client() {
  # navigate into the client folder to run webpack
  cd client

  if ! [ -d "node_modules" ]; then
    # run npm install to install dependencies
    npm install
  fi

  if [ ${NODE_ENV} == "production" ]; then
    # build static assets
    npm run build
  else
    # watch and hot reload files with webpack-dev-server
    npm run watch
  fi
}

function setup_server() {
  # run any pending migrations
  python manage.py makemigrations
  python manage.py migrate
}

function start_app_docker () {
  setup_server && python manage.py runserver 0.0.0.0:8000
}

function start_app_local () {
  setup_server && setup_client & python manage.py runserver 0.0.0.0:8000
}



case "$1" in
  production)  export NODE_ENV=production;  start_app_local; ;;
  test)   export NODE_ENV=test; start_app_local; ;;
  dockerdev)   start_app_docker; ;;
  * )    export NODE_ENV=development; start_app_local; ;;
esac

# does not apply yo dockerdev
# run client setup and start server in parallel
# this allows webpack-dev-server and the Django server to run concurrently
# if in production, setup_client will exit once building is done
# this means you need to wait for webpack's initial output before attempting
# to launch the app in a browser


