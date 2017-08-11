#!/bin/bash

OPTIND=1
TESTED_CLIENT=0
TESTED_SERVER=0
TESTS_FAILED=0
SHOULD_REPORT=0

show_help () {
  echo "\nThis script is a testing and coverage reporting utility\n"
  echo "Options:"
  echo "\t-h:\tDisplay this help menu"
  echo "\t-c:\tRun client tests"
  echo "\t-s:\tRun server tests"
  echo "\t-r:\tSubmit coverage report to a coverage analysis tool\n"
}

while getopts "hcsrR:" opt; do
  case "$opt" in
  h)
    show_help
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
  show_help
  exit 1
fi

if [ $SHOULD_REPORT -eq 1 ]; then
  if [ $TESTED_CLIENT -eq 1 ]; then
    cd client
    npm run report
    cd ..
  fi

  if [ $TESTED_SERVER -eq 1 ]; then
    echo "\nPlease configure a coverage analysis solution for the server"
  fi
fi

if [ $TESTS_FAILED -eq 1 ]; then
  echo "\n\n\033[31mSome tests failed.\033[0m\n"; exit 1
else
  echo "\n\n\033[32mAll tests passed!\033[0m\n"; exit 0
fi
