#!/bin/bash
. ./tests-second-floor/sprint_1/print_err.sh
. ./tests-second-floor/sprint_1/ERRORS_KEYS.sh

START=$(npm run | grep "start" -A1)
if [[ -z $START ]]
then
	print_err $START_ERR
	exit 1
fi

exit 0