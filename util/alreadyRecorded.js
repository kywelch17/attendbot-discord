const fs = require('fs');

const alreadyRecorded = function(name){
    try{
        const data = fs.readFileSync('/Users/kylewelch/Desktop/Code/Projects/attendbot-discord/log.txt', 'utf8');
        var tof = data.includes(name);
        return tof;
    }
    catch(err){
        console.log(err);
    }
}

module.exports = alreadyRecorded;