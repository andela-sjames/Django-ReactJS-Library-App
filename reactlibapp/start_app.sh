#!/bin/bash

function collect_static() {
    # navigate into the static folder to install static files
    cd static

    if ! [ -d "bower_components" ]; then
        # run bower install to install static files
        bower install
    fi

    if ! [ -d "node_modules" ]; then
        # run npm install to install dependencies
        npm install
    fi

    if ! [ -d "dist" ]; then
        webpack
    fi

    cd libraryapi

    if ! [ -d migrations]
        python manage.py makemigrations
        python manage.py migrate    
    fi    
}

function docker() {
    if ! [ $1 == "stop" ]; then
        collect_static
        docker-compose up
    else
        docker-compose down
    fi
}

docker
