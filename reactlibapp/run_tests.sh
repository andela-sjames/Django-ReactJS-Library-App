#!/bin/bash

OPTIND=1
TESTED_CLIENT=0
TESTED_SERVER=0
TESTS_FAILED=0
SHOULD_REPORT=0

read -d '' HELP_STRING <<'EOF'
  "This script is a testing and coverage reporting utility"
  Usage:
    ./run_tests.sh <Options>

  "Options:"
    "-h:    Display this help menu"
    "-c:    Run client tests"
    "-s:    Run server tests"
    "-r:    Submit coverage report to a coverage analysis tool"

  example:
    ./run_tests.sh -h
    ./run_tests.sh -c
    ./run_tests.sh -s
    ./run_tests.sh -r

EOF

set -e

function export_env() {
    export SECRET_KEY=django-react-library-app
    export DB_USER=postgres
    export DB_PASS=postgres
    export DB_SERVICE=postgres
    export DB_PORT=5432
    export DB_NAME=postgres
}

while getopts "hcsrR:" opt; do
  case "$opt" in
  h)
    echo "$HELP_STRING"
    exit 0
    ;;
  c)
    TESTED_CLIENT=1
    cd client
    npm test
    if [ $? -gt 0 ]; then
      TESTS_FAILED=1
    fi
    cd ..
    ;;
  s)
    TESTED_SERVER=1
    export_env
    coverage run --source libraryapp manage.py test
    if [ $? -gt 0 ]; then
      TESTS_FAILED=1
    fi
    ;;
  r)  SHOULD_REPORT=1
    ;;
  esac
done

shift $((OPTIND-1))

[ "$1" = "--" ] && shift

if [ $TESTED_CLIENT -eq 0 -a $TESTED_SERVER -eq 0 ]; then
  echo "$HELP_STRING"
  exit 1
fi

if [ $SHOULD_REPORT -eq 1 ]; then
  if [ $TESTED_CLIENT -eq 1 ]; then
    cd client
    npm run report
    cd ..
  fi

  if [ $TESTED_SERVER -eq 1 ]; then
    echo -e "\nPlease configure a coverage analysis solution for the server"
  fi
fi

if [ $TESTS_FAILED -eq 1 ]; then
  # https://github.com/ryanoasis/public-bash-scripts/blob/master/unix-color-codes.sh
  echo -e "\n\n\033[31mSome tests failed.\033[0m\n"; exit 1
else
  echo -e "\n\n\033[32mAll tests passed!\033[0m\n"; exit 0
fi
