#!/bin/bash
. ./tests-second-floor/sprint_1/print_err.sh
. ./tests-second-floor/sprint_1/ERRORS_KEYS.sh

PARCEL=$(cat package.json | grep "parcel")
if [[ -z $PARCEL ]]
then
	print_err $PARCEL_ERR
	exit 1
fi

exit 0
