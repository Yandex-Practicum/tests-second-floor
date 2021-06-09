#!/bin/bash
sudo cp tests-second-floor/geckodriver /usr/local/bin
sudo ls -la /usr/local/bin
npm  --prefix ./tests-second-floor/selenium_test install ./tests-second-floor/selenium_test &> install_errors.txt
node tests-second-floor/selenium_test/ui_test.js
