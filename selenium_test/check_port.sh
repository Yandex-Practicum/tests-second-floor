. ./tests-second-floor/1_sprint/print_err.sh
. ./tests-second-floor/1_sprint/ERRORS_KEYS.sh

npm install -f && npm run start &
timeout 120 bash tests-second-floor/selenium_test/setInterval.sh

print_err $PORT_ERR
exit 1
