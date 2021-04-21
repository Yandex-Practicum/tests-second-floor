#!/bin/bash
. ./tests-second-floor/sprint_1/print_err.sh
. ./tests-second-floor/sprint_1/ERRORS_KEYS.sh

function print_green(){
	echo -e "\e[32m$@\e[0m"
}
function print_red(){
	echo -e "\e[31m$@\e[0m"
}

print_green "CHECK START"
print_green "CHECK PARCEL"
print_green "CHECK PORT"
print_green "CHECK ROUTING"
print_green "CHECK TYPESCRIPT"
print_green "CHECK STYLELINT"
print_green "CHECK ESLINT"
print_green "CHECK MOCHA"
print_green "CHECK CHAI"

exit 0