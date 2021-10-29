#!/bin/bash
. ./tests-second-floor/sprint_1/print_err.sh
. ./tests-second-floor/sprint_1/ERRORS_KEYS.sh

LINK=$(cat *.md | grep github.com/ | grep /middle.messenger.praktikum.yandex)

if [[ -z $LINK ]]
then
	print_err $GITHUB_LINK_ERR
	exit 1
fi

exit 0
