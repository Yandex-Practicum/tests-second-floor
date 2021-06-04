#!/bin/bash
cp tests-second-floor/geckodriver .
npm ci &> install_errors.txt
node tests-second-floor/selenium_test/ui_test.js
rm geckodriver