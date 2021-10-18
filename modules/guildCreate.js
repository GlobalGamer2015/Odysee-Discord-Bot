const Guild = require('./../models/guild');
config_data = require('./../config/config.json')

module.exports = function(bot, logger) {
    bot.on("guildCreate", (guild) => {
		const name = guild.name;
		const id = guild.id;

		const MongoClient = require('mongodb').MongoClient,
    	f = require('util').format;

    	var url = f(`mongodb://${config_data.mongoUser}:${config_data.mongoPass}@${config_data.mongoURI}?authSource=admin`)
		
		MongoClient.connect(url, function(err, db) {
    		if (err) {
				console.log(err)
				logger.error(`Date: ${Date.now()}\nCL: 14\nError Name: ${err.name}\nError Message: ${err.message}\nError Stack: ${err.stack}\n`)
			}

        	Guild.findOne({id:new RegExp('^' + id + '$', "i")}).exec((err,guild)=> {
            	if(err) {
                	console.log(err)
					logger.error(`Date: ${Date.now()}\nCL: 20\nError Name: ${err.name}\nError Message: ${err.message}\nError Stack: ${err.stack}\n`)
            	}
            	if(guild) {
                	if(guild.id === id) {
                    	guild.disabled = false;
                    	guild.save(function (err) {
                        	if(err) {
                            	console.log(err)
								logger.error(`Date: ${Date.now()}\nCL: 28\nError Name: ${err.name}\nError Message: ${err.message}\nError Stack: ${err.stack}\n`)
                        	}
                    	})
                	}
            	}
            	else if(!guild) {
                	var insertGuild = new Guild({
                    	name: name,
                    	id: id,
                    	data: {
                        	notification_stream_channel: "",
                        	notification_content_channel: "",
                    	},
                    	disabled: false
                	})
                	insertGuild.save(function (err) {
                    	if(err) {
                        	console.log(err)
							logger.error(`Date: ${Date.now()}\nCL: 46\nError Name: ${err.name}\nError Message: ${err.message}\nError Stack: ${err.stack}\n`)
                    	}
                	})

                    db.db(`discord_${id}`).createCollection("users", function(err, res) {
                        if (err) {
							if(err.contains("MongoServerError: Collection already exists.")) {
								// Dont announce error
							}
							else {
								console.log(err);
								logger.error(`Date: ${Date.now()}\nCL: 53\nError Name: ${err.name}\nError Message: ${err.message}\nError Stack: ${err.stack}\n`)
							}
						}
                    });
            	}
        	})
    	})
	})
}