#!/bin/bash
npm  --prefix ./tests-second-floor/selenium_test install ./tests-second-floor/selenium_test &> install_errors.txt

npm install -g geckodriver &> install_errors.txt
node tests-second-floor/selenium_test/ui_test.js
