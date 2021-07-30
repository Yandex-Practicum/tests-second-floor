const fs = require('fs');
const path = require('path');

function redLog (err) {
	console.log('\x1b[31m' + err + '\x1b[0m')
}

const package = () => {
    return JSON.parse(fs.readFileSync('./package.json', 'utf-8').toString());
}

if (!package().devDependencies?.hasOwnProperty('webpack') && !package().dependencies?.hasOwnProperty('webpack') &&
!package().devDependencies?.hasOwnProperty('webpack-cli') && !package().dependencies?.hasOwnProperty('webpack-cli') &&
!package().devDependencies?.hasOwnProperty('webpack-dev-server') && !package().dependencies?.hasOwnProperty('webpack-dev-server')) {
	redLog('No webpack in package.json')
	process.exit(1)
}


process.exit(0)
