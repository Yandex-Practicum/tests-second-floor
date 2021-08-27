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
npm install puppeteer &> install_errors.txt
start=$(($(date +%s%N)/1000000))
node tests-second-floor/puppeteer_test/ui_test.js
check

