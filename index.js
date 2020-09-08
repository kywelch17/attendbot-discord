const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');
const dotenv = require('dotenv').config();

//======== DISCORD STUFF =========
client.on('ready', () => {
    console.log(`${client.user.tag} is logged in!`)
});
client.on('message', message => {
    //Avoid bot-ception
    if(message.author.bot){
        return;
    }
    
    //The real commands
    switch(message.content){
        case '!here':
            if(message.member.nickname === null){
                if(alreadyRecorded(message.member.user.username) === true){
                    message.channel.send('You already recorded your attendance');
                }
                else{
                    fs.appendFile('./log.txt', message.member.user.username + '\r\n', 'utf8', 
                        function(err){
                            if(err) throw err;
                            message.channel.send(`${message.member.user.username}, you're recorded.`);
                        });
                }
            }
            else{
                if(alreadyRecorded(message.member.nickname) === true){
                    message.channel.send('You already recorded your attendance');
                }
                else{
                    fs.appendFile('./log.txt', message.member.nickname + '\r\n', 'utf8', 
                        function(err){
                            if(err) throw err;
                            message.channel.send(`${message.member.nickname}, you're recorded.`);
                        });
                }
            }
            break;
        case '!export':
            if(checkRole(message)){
                fs.readFile('./log.txt', 'utf8', 
                    function(err, data){
                        if(err){
                            message.channel.send('Attendance has not started yet. Please use `!here` to get the record started.');
                        }
                        else{
                            message.channel.send(data);
                        }
                    });
            }
            else{
                message.channel.send('You don\'t have the role to do that.');
            }
            break;
        case '!clear':
            if(checkRole(message)){
                fs.unlink('./log.txt', 
                    function(err){
                        if(err){
                            message.channel.send('Attendance has not started yet. Please use `!here` to get the record started.');
                        }
                        else{
                            message.channel.send('Log cleared!');
                        }
                    });
            }
            else{
                message.channel.send('You don\'t have the role to do that.');
            }
            break;
    }
});

client.login(process.env.BOT_TOKEN);


//============= UTIL FUNCTIONS ===============
function alreadyRecorded(name){
    try{
        const data = fs.readFileSync('./log.txt', 'utf8');
        var tof = data.includes(name);
        return tof;
    }
    catch(err){
        console.log(err);
    }
}

function checkRole(m){
    return m.member.roles.cache.some(role => role.name === 'king');
}