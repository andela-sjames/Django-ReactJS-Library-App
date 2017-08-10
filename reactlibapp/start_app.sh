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

function export_env() {
  export SECRET_KEY=django-react-library-app
  export DB_USER=postgres
  export DB_PASS=postgres
  export DB_SERVICE=postgres
  export DB_PORT=5432
  export DB_NAME=postgres
}

function exec_docker() {

  if [ "$1" == "start" ]; then
    docker-compose up
  elif [ "$1" == "stop" ]; then
    docker-compose down
  else
    echo "Enter an argument for docker: (start or stop)"
    echo "$HELP_STRING"
  fi
}

function local_serve() {
  setup_server
  # run client setup and start server in parallel
  # this allows webpack-dev-server and the Django server to run concurrently
  # if in production, setup_client will exit once building is done
  # this means you need to wait for webpack's initial output before attempting
  # to launch the app in a browser
  setup_client & python manage.py runserver
}

function run_local() {
  if [ "$1" == "production" ]; then
    export NODE_ENV=production
  elif [ "$1" == "test" ]; then
    export NODE_ENV=test
  else
    export NODE_ENV=development
  fi
  local_serve
}


set +e

read -d '' HELP_STRING <<'EOF'

Usage:
  ./start_app <command>

commands:
  docker
  local
  help

sub-commands:
  docker:
    start
    stop

  local:
    production
    test

example: 
  ./start_app docker start
  ./start_app docker stop
  ./start_app local production
  ./start_app local test
  ./start_app local 
  ./start_app help

EOF

set -e

case "$1" in
    local)   export SECRET_KEY=django-react-library-app; run_local $2; ;;
    docker)  export_env; exec_docker $2; ;;
    help)    show_help=true; ;;
    * )      echo "Unrecognized command '$1'."; show_help=true; ;;
esac

if [[ "$show_help" == "true" ]]; then
    echo "$HELP_STRING"
fi
