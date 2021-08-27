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

print_green "CHECK PORT"
bash tests-second-floor/sprint_1/check_port.sh
check

start=$(($(date +%s%N)/1000000))
print_green "CHECK REGISTRATION"
npm install puppeteer &> install_errors.txt
node tests-second-floor/puppeteer_test/ui_test.js
check
end=$(($(date +%s%N)/1000000))
echo "Elapsed Time: $(($end-$start)) milliseconds"