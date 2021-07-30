const fs = require('fs');
const path = require('path');
const { checkDependencies, checkDevDependencies } = require("../checkDep");

function redLog (err) {
	console.log('\x1b[31m' + err + '\x1b[0m')
}

if (!checkDevDependencies('parcel') && !checkDependencies('parcel') &&
!checkDevDependencies('parcel-bundler') && !checkDependencies('parcel-bundler')) {
	redLog('No parcel or parcel-bundler in package.json')
	process.exit(1)
}


process.exit(0)
