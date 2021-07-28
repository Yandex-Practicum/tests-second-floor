const fs = require('fs');
const path = require('path');
const { exec } = require("child_process");

function redLog (err) {
	console.log('\x1b[31m' + err + '\x1b[0m')
}

const package = () => {
    return JSON.parse(fs.readFileSync('./package.json', 'utf-8').toString());
}

if ((package().dependencies?.hasOwnProperty('typescript'))) {
	redLog('typescript should be only in devDependencies, not in dependencies')
	process.exit(1)
}

if (!package().devDependencies.hasOwnProperty('typescript')) {
	redLog('No typescript in package.json')
	process.exit(1)
}

process.exit(0)
