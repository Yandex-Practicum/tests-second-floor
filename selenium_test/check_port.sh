#!/bin/bash
. ./tests-second-floor/sprint_1/print_err.sh
. ./tests-second-floor/sprint_1/ERRORS_KEYS.sh

sudo npm install -g n
sudo n latest
node -v

npm install -f && npm run start &
sleep 60

PORT=$(netstat -an | grep ':3000 ')
if [[ -z $PORT ]]
then
	print_err $PORT_ERR
	exit 1
fi

npm  --prefix ./tests-second-floor/selenium_test install ./tests-second-floor/selenium_test &> install_errors.txt
npm install -g selenium-webdriver
npm install -g geckodriver

node tests-second-floor/selenium_test/ui_test.js

exit 0
