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

print_green "CHECK PARCEL"
node tests-second-floor/sprint_1/check_parcel.js
check

print_green "CHECK PORT"
bash tests-second-floor/sprint_1/check_port.sh
check



print_green "CHECK UI"
node tests-second-floor/selenium_test/ui_test.sh
check

exit 0
