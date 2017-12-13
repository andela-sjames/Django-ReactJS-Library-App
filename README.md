# Django-ReactJS-Library-App

An app to manage Amity library books using ReactJS.

[![CircleCI](https://circleci.com/gh/andela-sjames/Django-ReactJS-Library-App/tree/develop.svg?style=svg)](https://circleci.com/gh/andela-sjames/Django-ReactJS-Library-App/tree/develop)

## Getting Started

These project is developed using Python (Django) for the backend and React.js for the front-end.
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run this project the following prerequisites are required installed and available in the enviroment.

- [Python](https://www.python.org/downloads/) (Along with [pip](https://pypi.python.org/pypi/pip))
- [Node](https://nodejs.org/en/) (NPM specifically)
- [PostgreSQL](https://www.postgresql.org/download/)
- [SQLite](https://sqlite.org/download.html) (For tests)

For further information on setting up your development environment checkout this [document](http://sourabhbajaj.com/mac-setup/Python/)

### Installing

To install the project follow the following steps

- First install [Virtualenv](http://www.virtualenv.org/) to create an isolated enviroment for this Python project with the command:

  `pip install virtualenv`

- Clone the project to your machine by running on the terminal in your desired directory:

  `git clone https://github.com/andela-sjames/Django-ReactJS-Library-App.git`

- Navigate in to the root directory of the project and run the command below to create your local Python environment:
- Project uses python 3

  `virtualenv -p python3 env`

- Create a `.env` at the root of the project and populate with the following sample data

```bash
SECRET_KEY=some_awesome_secret_key
DB_USER=reactlibapp
DB_PASS=reactlibapp
DB_PORT=5432
DB_HOST=db
DB_NAME=reactlibapp
CLIENT_ID=google_client_id
```

- Navigate into the `reactlibapp/scripts` directory and run the following commands:

  - `./createdb <db_name/db_user>` to create your db and db user for postgres connection

  - `./app.sh start local` to start the project.

- Or just call the help menu ./app.sh help from the `scripts` folder to see the available options for Docker.

- The project has a command line tool that simplify development:
- use `./app.sh help` to see usage

- The resources used by the application is documented via swagger, to view that navigate to:
  `http://localhost:8000/docs`

At this point you can open up your browser and visit `http://localhost:8000` to see the application running.

*P.S*: To run a production instance of the application in development using `gunicorn`, follow the steps below:

- run the command: `gunicorn reactlibapp.wsgi --bind 127.0.0.1:8000 --pythonpath=reactlibapp`

## Running the tests

TBD

### Break down into end to end tests


### And coding style tests

TBD

## Deployment

TDB

## Built With

TBD

## Contributing

TBD

## Versioning

TBD

## Contributors

Here's a [list](https://github.com/andela-sjames/Django-ReactJS-Library-App/graphs/contributors) of the contributors of this project.2

See also the list of [contributors](https://github.com/andela-sjames/Django-ReactJS-Library-App/contributors) who participate in this project.

## License

Django-ReactJS-Library-App is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
