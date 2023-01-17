const fs = require('fs');
const path = require('path');
const { checkDependencies, checkDevDependencies } = require("../checkDep");

function redLog (err) {
	console.log('\x1b[31m' + err + '\x1b[0m')
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles
}

const getStylesExtension = (directory) => {
  const files = getAllFiles(directory);
  if (files.some((filePath) => filePath.includes('.scss'))) {
    return 'scss'
  } else if (files.some((filePath) => filePath.includes('.css'))) {
    return 'css'
  }
  return '';
}

const package = () => {
    return JSON.parse(fs.readFileSync('./package.json', 'utf-8').toString());
}

if ((checkDependencies('stylelint'))) {
	redLog('stylelint should be only in devDependencies, not in dependencies')
	process.exit(1)
}

if (!checkDevDependencies('stylelint')) {
	redLog('No stylelint in package.json')
	process.exit(1)
}

const extension = getStylesExtension('.');
if (extension === '') {
  redLog('There are no style files with the extension either.css, or .scss')
  process.exit(1);
}

const stylelint = require('stylelint');
const stylelint_opt = () => {
    return JSON.parse(fs.readFileSync('./.stylelintrc.json', 'utf-8').toString());
}

try {
	stylelint_opt()
}
catch (err) {
	redLog('.stylelintrc.json file not found')
	process.exit(1)
}

async function useLint(projectPath) {
    const data = await stylelint.lint({
        files: `${projectPath}**/*.${extension}`,
        config: stylelint_opt()
    });
    const errors = [];
    for (let result of data.results) {
        for (let warning of result.warnings) {
            warning.source = result.source
            errors.push(warning);
        }
    }
    return errors;
}

async function test() {
    const lint = await useLint('');
    for (const warning of lint) {
        console.error(`\x1b[36m${warning.text}\x1b[33m source: ${warning.source}\x1b[32m line:${warning.line} column:${warning.column}\x1b[0m`);
    }
	if (lint.length)
		redLog('Check the warnings above')
    process.exit(lint.length);
}

test();
