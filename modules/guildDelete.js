const Guild = require('./../models/guild');
config_data = require('./../config/config.json')

module.exports = function(bot, logger) {
    bot.on("guildDelete", (guild) => {
        const name = guild.name;
        const id = guild.id;
        Guild.findOne({id:new RegExp('^' + id + '$', "i")}).exec((err,guild)=> {
            if(err) {
                console.log(err)
                logger.error(`Date: ${Date.now()}\nCL: 8\nError Name: ${err.name}\nError Message: ${err.message}\nError Stack: ${err.stack}\n`)
            }
            if(guild) {
                if(guild.id === id) {
                    guild.disabled = true;
                    guild.save(function (err) {
                        if(err) {
                            console.log(err)
                            logger.error(`Date: ${Date.now()}\nCL: 16\nError Name: ${err.name}\nError Message: ${err.message}\nError Stack: ${err.stack}\n`)
                        }
                    })
                }
            }
        })
    });
}