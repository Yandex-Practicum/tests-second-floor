. ./tests-second-floor/1_sprint/print_err.sh
. ./tests-second-floor/1_sprint/ERRORS_KEYS.sh

npm install -f && npm run start &
timeout 100 bash tests-second-floor/sprint_1/setInterval.sh

if [[ $? == "0" ]]; then
	exit 0
fi

print_err $PORT_ERR
exit 1
