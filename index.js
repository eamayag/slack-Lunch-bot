function onInstallation(bot, installer) {
    if (installer) {
        bot.startPrivateConversation({user: installer}, function (err, convo) {
            if (err) {
                console.log(err);
            } else {
                convo.say('I am a bot that has just joined your team');
                convo.say('You must now /invite me to a channel so that I can be of use!');
            }
        });
    }
}

var config = {};
if (process.env.MONGOLAB_URI) {
    var BotkitStorage = require('botkit-storage-mongo');
    config = {
        storage: BotkitStorage({mongoUri: process.env.MONGOLAB_URI}),
    };
} else {
    config = {
        json_file_store: ((process.env.TOKEN)?'./db_slack_bot_ci/':'./db_slack_bot_a/'), //use a different name if an app or CI
    };
}

if (process.env.TOKEN || process.env.SLACK_TOKEN) {
    var customIntegration = require('./lib/custom_integrations');
    var token = (process.env.TOKEN) ? process.env.TOKEN : process.env.SLACK_TOKEN;
    var controller = customIntegration.configure(token, config, onInstallation);
} else if (process.env.CLIENT_ID && process.env.CLIENT_SECRET && process.env.PORT) {
    var app = require('./lib/apps');
    var controller = app.configure(process.env.PORT, process.env.CLIENT_ID, process.env.CLIENT_SECRET, config, onInstallation);
} else {
    console.log('Error: If this is a custom integration, please specify TOKEN in the environment. If this is an app, please specify CLIENTID, CLIENTSECRET, and PORT in the environment');
    process.exit(1);
}

controller.on('rtm_open', function (bot) {
    console.log('** The RTM api just connected!');
});

controller.on('rtm_close', function (bot) {
    console.log('** The RTM api just closed');
});




//BOT LOGIC
var _ = require('lodash'); 

controller.on('bot_channel_join', function (bot, message) {
    bot.reply(message, "I'm here!")
});

let employees = [];
let active = false;

controller.hears('Lunch-bot on', 'ambient', function (bot, message) {
    active = true;
    bot.reply(message, "I hear you! If you wanna join to lunch out, say 'yo'!")
})

controller.hears('yo', 'ambient', function (bot, message) {
    if (active) {
        if (employees.includes("<@"+message.user+">") ){
            bot.reply(message, "You're already in, <@"+message.user+">")            
        } else {
            employees.push("<@"+message.user+">")        
            bot.reply(message, "You're in, <@"+message.user+">")
        }
    }
})

function creatingSubgroups(array, groups, personPerGroup) {
    let subgroups = [];
    for (let i=0; i<groups; i++){
        subgroups[i] = [];
        for (let j=0; j<personPerGroup; j++){
            subgroups[i].push(array[i*personPerGroup+j])
        }
    }
    
    let group = 0;
    for (let i=personPerGroup*groups; i< array.length; i++){
        subgroups[group].push(array[i])
        group++
    }
    return subgroups;
}

controller.hears('Lunch-bot off', 'ambient', function (bot, message) {
    active = false;
    let totalGroups = Math.trunc((employees.length -1) / 7) +1; 
    let employeesPerGroup = Math.trunc(employees.length / totalGroups);
    let shuffledEmployees = _.shuffle(employees);

    var resultingGroups = creatingSubgroups(shuffledEmployees, totalGroups, employeesPerGroup);

    bot.reply(message, "Total employees this week: " + shuffledEmployees);
    
    resultingGroups.forEach(e => {
        bot.reply(message, "Group: " + e + "; leader this week: " + e[0])
    }) 
})
