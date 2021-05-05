#!/bin/bash
. ./tests-second-floor/sprint_1/print_err.sh
. ./tests-second-floor/sprint_1/ERRORS_KEYS.sh

function print_green(){
	echo -e "\e[32m$@\e[0m"
}
function print_red(){
	echo -e "\e[31m$@\e[0m"
}

function check(){
	if [[ $? != 0 ]]
		then
		print_red "FAILED"
		exit 1
	fi
}

print_green "CHECK START"
bash tests-second-floor/sprint_1/check_start.sh
check

print_green "CHECK TYPESCRIPT"
node tests-second-floor/sprint_2/check_typescript.js
check

print_green "CHECK STYLELINT"
node tests-second-floor/sprint_2/check_stylelint.js
check

print_green "CHECK ESLINT"
node tests-second-floor/sprint_2/check_eslint.js
check

exit 0