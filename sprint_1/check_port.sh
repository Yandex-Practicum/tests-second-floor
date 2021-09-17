. ./tests-second-floor/sprint_1/print_err.sh
. ./tests-second-floor/sprint_1/ERRORS_KEYS.sh

sudo npm install -g pnpm && pnpm i -f && pnpm run start &
timeout 180 bash tests-second-floor/sprint_1/setInterval.sh

if [[ $? == "0" ]]; then
	sleep 15
	exit 0
fi

print_err $PORT_ERR
exit 1
