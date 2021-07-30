const fs = require('fs');
const path = require('path');

function redLog (err) {
	console.log('\x1b[31m' + err + '\x1b[0m')
}

const package = () => {
    return JSON.parse(fs.readFileSync('./package.json', 'utf-8').toString());
}

if (!package().devDependencies?.hasOwnProperty('mocha') && !(package().dependencies?.hasOwnProperty('mocha'))) {
	redLog('No mocha in package.json')
	process.exit(1)
}

process.exit(0)
