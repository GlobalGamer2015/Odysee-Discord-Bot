const Guild = require('./../models/guild');
config_data = require('./../config/config.json')

module.exports = function(bot, logger) {
    bot.on("guildDelete", (guild) => {
        const name = guild.name;
        const id = guild.id;
        Guild.findOne({id:new RegExp('^' + id + '$', "i")}).exec((err,guild)=> {
            if(guild) {
                if(guild.id === id) {
                    guild.disabled = true;
                    guild.save(function (err) {
                        if(err) {
                            console.log(err)
                        }
                    })
                }
            }
        })
    });
}