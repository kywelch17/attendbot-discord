const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');
const dotenv = require('dotenv').config();

//Util functions
const alreadyRecorded = require('./util/alreadyRecorded');
const checkRole = require('./util/checkRole');

//======== DISCORD STUFF =========
client.on('ready', () => {
    console.log(`${client.user.tag} is logged in!`)
});
client.on('message', message => {
    //Avoid bot-ception
    if(message.author.bot){
        return;
    }

    const username = message.member.user.username;
    const nickname = message.member.nickname;

    //The real commands
    switch(message.content){
        case '!here':
            if(alreadyRecorded(username) === true || alreadyRecorded(nickname) === true){
                message.channel.send('You are already recorded');
                break;
            }
            else{
                fs.exists('./log.txt', 
                    function(exists){
                        if(!exists){
                            fs.open('./log.txt', 'a', 
                                function(err, f){
                                    console.log('SAVED');
                                });
                        }
                    });
                if(nickname === null){
                    fs.appendFile('./log.txt', username + '\r\n', 'utf8', 
                        function(err){
                            message.channel.send(`${username}, thank you for attending!`);
                        });
                }
                else{
                    fs.appendFile('./log.txt', nickname + '\r\n', 'utf8', 
                        function(err){
                            message.channel.send(`${nickname}, thank you for attending!`);
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
        case '!help':
            message.channel.send('`!here` - To register your attendance, call this command and you will be logged as present.\n'
                + '`!export` - This will output all the put who logged in as present.\n'
                + '`!clear` - This clears the logs, you start a new one with whoever first says `!here`.');
            break;
    }
});

client.login(process.env.BOT_TOKEN);