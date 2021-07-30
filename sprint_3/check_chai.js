const fs = require('fs');
const path = require('path');
const { checkDependencies, checkDevDependencies } = require("../checkDep");

function redLog (err) {
	console.log('\x1b[31m' + err + '\x1b[0m')
}

const package = () => {
    return JSON.parse(fs.readFileSync('./package.json', 'utf-8').toString());
}

if (!checkDevDependencies('chai') && !(checkDependencies('chai'))) {
	redLog('No chai in package.json')
	process.exit(1)
}

process.exit(0)
