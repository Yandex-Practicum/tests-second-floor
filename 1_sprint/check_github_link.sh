#!/bin/bash
. ./tests-second-floor/1_sprint/print_err.sh
. ./tests-second-floor/1_sprint/ERRORS_KEYS.sh

LINK=$(cat README.md | grep https://github.com/ | grep /middle.messenger.praktikum.yandex)

if [[ -z $LINK ]]
then
	print_err $GITHUB_LINK_ERR
	exit 1
fi

exit 0
