const Guild = require('./../models/guild');

module.exports = function(msg, prefix, bot, logger) {
	if(msg.content.startsWith(`${prefix} notify stream`)) {
    if(msg.member.roles.cache.some(role => role.name === 'Owner') || msg.member.roles.cache.some(role => role.name === 'Admin')) {
      const notification_stream_channel = msg.content.replace(`${prefix} notify stream `, '');

      Guild.find({},(err,guilds)=> {
        if(err) {
          console.log(err);
          logger.error(`Date: ${Date.now()}\nCL: 8\nError Name: ${err.name}\nError Message: ${err.message}\nError Stack: ${err.stack}\n`);
        }
        guilds.forEach(function(guild){
          if(guild.id === msg.channel.guild.id) {
            try {
              bot.channels.cache.get(notification_stream_channel).id;
              guild.data.notification_stream_channel = notification_stream_channel;
              guild.save(function (err) {
                if(err) {
                  console.log(err);
                  logger.error(`Date: ${Date.now()}\nCL: 18\nError Name: ${err.name}\nError Message: ${err.message}\nError Stack: ${err.stack}\n`);
                }
              });
              msg.channel.send('Stream notifications channel has been updated.');
            }
            catch(err) {
              msg.channel.send(`Channel "${notification_stream_channel}" not found, are you sure that is correct?`);
              logger.error(`Date: ${Date.now()}\nCL: 15\nCatch Error Message: ${err.message}\n`);
            }
          }
        });
      });
    }
    else {
			msg.channel.send('This command requires you to have one of these role names: "Owner", "Admin"');
		}
  }
  if(msg.content.startsWith(`${prefix} notify content`)) {
    if(msg.member.roles.cache.some(role => role.name === 'Owner') || msg.member.roles.cache.some(role => role.name === 'Admin')) {
      const notification_content_channel = msg.content.replace(`${prefix} notify content `, '');

      Guild.find({},(err,guilds)=> {
        if(err) {
          console.log(err);
          logger.error(`Date: ${Date.now()}\nCL: 42\nError Name: ${err.name}\nError Message: ${err.message}\nError Stack: ${err.stack}\n`);
        }
        guilds.forEach(function(guild){
          if(guild.id === msg.channel.guild.id) {
            try {
              bot.channels.cache.get(notification_content_channel).id;
              guild.data.notification_content_channel = notification_content_channel;
              guild.save(function (err) {
                if(err) {
                  console.log(err);
                  logger.error(`Date: ${Date.now()}\nCL: 52\nError Name: ${err.name}\nError Message: ${err.message}\nError Stack: ${err.stack}\n`);
                }
              });
              msg.channel.send('Content notifications channel has been updated.');
            }
            catch(err) {
              msg.channel.send(`Channel "${notification_content_channel}" not found, are you sure that is correct?`);
              console.log(err);
              logger.error(`Date: ${Date.now()}\nCL: 49\nCatch Error Message: ${err.message}\n`);
            }
          }
        });
      });
    }
    else {
			msg.channel.send('This command requires you to have one of these role names: "Owner", "Admin"');
		}
  }
};
