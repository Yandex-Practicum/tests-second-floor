#!/bin/bash
function print_red(){
	echo -e "\e[31m$@\e[0m"
}

WEBPACK=$(npm run | grep "start" -A1 | grep "webpack")
if [[ -z $WEBPACK ]]
then
	print_red "NO WEBPACK IN START SCRIPT"
	exit 1
fi

exit 0
