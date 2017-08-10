#!/bin/sh

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

function docker() {
  # TODO: @gentlefella fix plz

  if [ $1 == "start" ]; then
    collect_static
    docker-compose up
  elif [ $1 == "stop" ]; then
    docker-compose down
  else
    echo "Enter an argument for docker: (start or stop)"
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

if [ $1 == "docker" ]; then
  export_env
  docker $2
elif [ $1 == "local" ]; then
  export SECRET_KEY=django-react-library-app
  if [ $2 == "production" ]; then
    export NODE_ENV=production
  elif [ $2 == "test" ]; then
    export NODE_ENV=test
  else
    export NODE_ENV=development
  fi
  local_serve
else
  echo "Please specify an environment: (docker or local)"
fi
