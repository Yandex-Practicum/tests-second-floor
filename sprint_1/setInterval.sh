#!/bin/bash

setInterval() {
	local func=$1
	local sleeptime=$2
	local _start _end _delta _sleep
	while true; do
		_start=$(date +%s)
		"$func"
		_end=$(date +%s)
		_delta=$((_end - _start))
		_sleep=$((sleeptime - _delta))
		sleep "$_sleep"
	done
}
check() {
	PORT=$(netstat -an | grep ':3000 ')
	if [[ $PORT ]]
then
	exit 0
fi
}

setInterval check 2
