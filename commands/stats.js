const process = require('process');
const prettyMilliseconds = require('pretty-ms');
const memoryUsage = process.memoryUsage().heapUsed/1000000;

module.exports = function(msg,prefix,MessageEmbed,bot) {
	if(msg.content === `${prefix} stats`) {
    const Embed = new MessageEmbed()
      .setColor('#4f1c82')
      .setTitle('Odysee Bot Statistics')
      .addFields(
        { name: 'Guilds', value: `${bot.guilds.cache.size}`, inline: true},
        { name: 'Uptime', value: `${prettyMilliseconds(bot.uptime)}`, inline: true},
        { name: 'Memory Usage', value: `${memoryUsage} MB`, inline: true},
        { name: 'Platform', value: `${process.platform}`, inline: true},
        { name: 'Node Version', value: `${process.version}`, inline: true}
      )
      .setTimestamp()
      .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)', false);
		msg.channel.send({ embeds: [Embed] });
  }
};
