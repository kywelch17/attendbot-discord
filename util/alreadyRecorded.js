const fs = require('fs');

const alreadyRecorded = function(name){
    const data = fs.readFileSync('./log.txt', 'utf8');
    return data.includes(name);
}

module.exports = alreadyRecorded;