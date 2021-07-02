#!/bin/bash
. ./tests-second-floor/sprint_1/print_err.sh
. ./tests-second-floor/sprint_1/ERRORS_KEYS.sh

npm  --prefix ./tests-second-floor/selenium_test install ./tests-second-floor/selenium_test &> install_errors.txt

#npm install -g selenium-webdriver &> install_errors.txt
npm install -g geckodriver &> install_errors.txt
node tests-second-floor/selenium_test/ui_test.js
