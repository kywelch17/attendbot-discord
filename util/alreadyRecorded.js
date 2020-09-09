const fs = require('fs');

const alreadyRecorded = function(name){
    if(!fs.existsSync('./log.txt')) return false;
    const data = fs.readFileSync('./log.txt', 'utf8');
    return data.includes(name);
}

module.exports = alreadyRecorded;