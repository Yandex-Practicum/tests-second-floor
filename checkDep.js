const fs = require('fs');
const package = () => {
    return JSON.parse(fs.readFileSync('./package.json', 'utf-8').toString());
}

const checkDependencies = (pack) => {
    try{
        if (package().dependencies.hasOwnProperty(pack))
            return true;
        else
            return false;
    }
    catch(err) {
        return false;
    }
}
const checkDevDependencies = (pack) => {
    try{
        if (package().devDependencies.hasOwnProperty(pack))
            return true;
        else
            return false;
    }
    catch(err) {
        console.log(err);
        return false;
    }
}

module.exports = { checkDependencies, checkDevDependencies };
