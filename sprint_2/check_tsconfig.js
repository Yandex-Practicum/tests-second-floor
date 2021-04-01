const fs = require('fs');
const path = require('path');
const { exec } = require("child_process");

function redLog (err) {
	console.log('\x1b[31m' + err + '\x1b[0m')
}

const tsconfig = () => {
    return JSON.parse(fs.readFileSync('./tsconfig.json', 'utf-8').toString());
}

if (tsconfig().compilerOptions.noImplicitAny &&
	tsconfig().compilerOptions.noUnusedLocals &&
	tsconfig().compilerOptions.noUnusedParameters &&
	tsconfig().compilerOptions.noUnusedParameters &&
	tsconfig().compilerOptions.noUnusedParameters)
{
	process.exit(0)
}

redLog('Compare your tsconfig.json with the checklist')
process.exit(1)
