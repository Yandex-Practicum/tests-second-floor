. ./tests-second-floor/1_sprint/print_err.sh
. ./tests-second-floor/1_sprint/ERRORS_KEYS.sh

npm install -f && npm run start &
timeout 100 bash tests-second-floor/selenium_test/setInterval.sh

if [[ $? == "0" ]]; then
	exit 0
fi

print_err $PORT_ERR
exit 1
