const stylelint = require('stylelint');
const fs = require('fs');
const path = require('path');

const stylelint_opt = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'stylelint.json'), 'utf-8').toString());
}

async function useLint(projectPath) {
    const data = await stylelint.lint({
        files: projectPath + '**/*.css',
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
        console.error(`${warning.text} source: ${warning.source} line:${warning.line} column:${warning.column}`);
    }
    process.exit(lint.length);
}

test();
