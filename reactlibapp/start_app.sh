#!/bin/sh

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

    cd ../libraryapi

    if ! [ -d "migrations" ]; then
        python ../manage.py makemigrations
        python ../manage.py migrate
    fi

    cd ../libraryapp

    if ! [ -d "migrations" ]; then
        python ../manage.py makemigrations
        python ../manage.py migrate
    fi
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
    if [ $1 == "start" ]; then
        collect_static
        docker-compose up
    elif [ $1 == "stop" ]; then
        docker-compose down
    else
        echo "Enter an argument for docker: (start or stop)"
    fi
}

function local_dev() {
    collect_static
    python ../manage.py runserver
}

function prod() {
    collect_static
    python manage.py collectstatic --no-input
    python manage.py runserver
}

if [ $1 == "docker" ]; then
    export_env
    docker $2
elif [ $1 == "local" ]; then
    export SECRET_KEY=django-react-library-app
    local_dev
fi
