const fs = require('fs');
const path = require('path');
const { checkDependencies, checkDevDependencies } = require("../checkDep");

function redLog (err) {
	console.log('\x1b[31m' + err + '\x1b[0m')
}

const package = () => {
    return JSON.parse(fs.readFileSync('./package.json', 'utf-8').toString());
}

if (!checkDevDependencies('webpack') && !checkDependencies('webpack') &&
!checkDevDependencies('webpack-cli') && !checkDependencies('webpack-cli') &&
!checkDevDependencies('webpack-dev-server') && !checkDependencies('webpack-dev-server')) {
	redLog('No webpack in package.json')
	process.exit(1)
}


process.exit(0)
