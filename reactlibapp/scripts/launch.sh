#!/bin/bash

set -e

# if any code doesn't return 0, exit the script
set -o pipefail

# print each step of your code to the terminal
set -x

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

  cd ..
}

function auto_venv() {
  echo 'Automating virtual environment activation'
  # check if a virtualenvironment has already been created before
  if ! [ -d "venv" ]; then
    # create a virtualenvironment with Python 3
    virtualenv --python=python3 venv
  fi

  source venv/bin/activate
  echo 'Yo!'
}

function setup_server() {
  # run any pending migrations
  cd ..
  echo 'Do you need me to automate virtual environment?'
  echo 'Enter y for yes, n for no'
  read response
  if [ $response == "y" ]; then
    auto_venv
  fi
  pip3 install -r requirements.txt
  python manage.py makemigrations
  python manage.py migrate
}

case "$1" in
  production)  export NODE_ENV=production; ;;
  test)        export NODE_ENV=test; ;;
  *)           export NODE_ENV=development; ;;
esac

# run client setup and start server in parallel
# this allows webpack-dev-server and the Django server to run concurrently
# if in production, setup_client will exit once building is done
# this means you need to wait for webpack's initial output before attempting
# to launch the app in a browser
setup_server && setup_client & cd .. && python manage.py runserver 0.0.0.0:8000
