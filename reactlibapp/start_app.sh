#!/bin/bash

function collect_static() {
    # navigate into the static folder to install static files
    cd static

    cd bower_components

    if [ -d "jquery" ]; then
        # run bower install to install static files
        bower install
    fi
}

function export_env() {
    # export the secret key to be available for that session
    export SECRET_KEY='this-is_a-django_react-app'
    export DB_USER=postgres
    export DB_PASS=postgres
    export DB_SERVICE=postgres
    export DB_PORT=5432
    export DB_NAME=postgres
}

function docker() {
    if [ $1 == "start" ]; then
        docker-compose up
    else
        docker-compose down
    fi
}
