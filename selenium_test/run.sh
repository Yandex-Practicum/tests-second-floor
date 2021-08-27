
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
		end=$(($(date +%s%N)/1000000))
		echo "Elapsed Time: $(($end-$start)) milliseconds"
		print_red "FAILED"
		exit 1
	fi
	end=$(($(date +%s%N)/1000000))
	echo "Elapsed Time: $(($end-$start)) milliseconds"
}

print_green "CHECK PORT"
bash tests-second-floor/sprint_1/check_port.sh


print_green "CHECK REGISTRATION"
npm  --prefix ./tests-second-floor/selenium_test install ./tests-second-floor/selenium_test &> install_errors.txt
npm install -g geckodriver &> install_errors.txt
start=$(($(date +%s%N)/1000000))
node tests-second-floor/selenium_test/ui_test.js
check

