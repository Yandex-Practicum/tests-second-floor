. ./tests-second-floor/sprint_1/print_err.sh
. ./tests-second-floor/sprint_1/ERRORS_KEYS.sh

sudo npm i && npm run start &
timeout 600 bash tests-second-floor/sprint_1/setInterval.sh

if [[ $? == "0" ]]; then
	sleep 15
	exit 0
fi

print_err $PORT_ERR
exit 1
