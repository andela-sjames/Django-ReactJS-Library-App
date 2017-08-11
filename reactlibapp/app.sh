#!/bin/bash

set +e

read -d '' HELP_STRING <<'EOF'

Usage:
  ./app <command>

commands:
  start   Starts the applicatiom
  stop    Stops the application

sub-commands:
  start:
    docker                    Starts the application in a Docker container
      fresh (optional)        Rebuilds the Docker image from scratch
    local:                    Starts the application in the local environment
      production              Starts the application locally in production mode
      test                    Starts the application locally in test mode
      development (default)   Starts the application locally in development mode

  stop:
    docker                    Stops the application running in a Docker container

example: 
  ./app start docker
  ./app start docker fresh
  ./app stop docker
  ./app start local
  ./app start local production
  ./app start local test
  ./app help

EOF

set -e

function start() {
  if [ "$1" == "docker" ]; then
    if [ "$2" == "fresh" ]; then
      docker-compose rm -f
      docker-compose build --no-cache
      docker-compose up
    else
      docker-compose up
    fi
  elif [ "$1" == "local" ]; then
    export SECRET_KEY=django-react-library-app
    ./launch.sh $2
  else
    echo "Enter an environment to start app in: (local or docker)"
    echo "$HELP_STRING"
  fi
}

function stop() {
  if [ "$1" == "docker" ]; then
    docker-compose down
  elif [ "$1" == "local" ]; then
    echo "To be implemented: Reliably stop processes running on app-specified ports"
    echo "Till then just use Ctrl+C"
  else
    echo "Enter app to stop: (local or docker)"
    echo "$HELP_STRING"
  fi
}

case "$1" in
  start)  shift; start $@; ;;
  stop)   stop $2; ;;
  help)   show_help=true; ;;
  * )     echo "Unrecognized command '$1'."; show_help=true; ;;
esac

if [[ "$show_help" == "true" ]]; then
  echo "$HELP_STRING"
fi