module.exports = function(msg,prefix,MessageEmbed) {
	if(msg.content === `${prefix} help`) {
		const Embed = new MessageEmbed()
            .setColor('#4f1c82')
            .setTitle('Help command')
			.setDescription('Run any of the following commands with the prefix "odysee". Example: odysee help')
            .addFields(
                { name: 'Common Commands', value: '`help` `invite` `stats`', inline: true},
                { name: 'Odysee Commands', value: '`notify` `user` `channel` `claim` `search`', inline: true},
                { name: 'LBRY Foundation Discord', value: 'https://discord.com/invite/SJMUq8EjXB', inline: false}
            )
            .setTimestamp()
            .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)',false);
		msg.channel.send({ embeds: [Embed] });
	}

    if(msg.content === `${prefix} help invite`) {
        const Embed = new MessageEmbed()
            .setColor('#4f1c82')
            .setTitle('Invite Help command')
			.setDescription('Help for Invite command.\nThis command allows you to invite the bot to other servers.')
            .addFields(
                { name: 'Commands', value: '`invite`', inline: true}
            )
            .setTimestamp()
            .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)',false);
		msg.channel.send({ embeds: [Embed] });
    }

    if(msg.content === `${prefix} help stats`) {
        const Embed = new MessageEmbed()
            .setColor('#4f1c82')
            .setTitle('Stats Help command')
			.setDescription('Help for Stats command.\nThis command tells you the current statistics of the bot.')
            .addFields(
                { name: 'Commands', value: '`stats`', inline: true}
            )
            .setTimestamp()
            .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)',false);
		msg.channel.send({ embeds: [Embed] });
    }

    if(msg.content === `${prefix} help notify`) {
        const Embed = new MessageEmbed()
            .setColor('#4f1c82')
            .setTitle('Notify Help command')
			.setDescription('Help for Notify command.\nThis command sets the notification channels for your server.')
            .addFields(
                { name: 'Role Required Commands', value: '`notify stream <guild channel id>` `notify content <guild channel id>`', inline: true}
            )
            .setTimestamp()
            .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)',false);
		msg.channel.send({ embeds: [Embed] });
    }

    if(msg.content === `${prefix} help user`) {
        const Embed = new MessageEmbed()
            .setColor('#4f1c82')
            .setTitle('User Help command')
			.setDescription('Help for User command.')
            .addFields(
                { name: 'Commands', value: '`user add <claim id>` `user remove <claim id>`', inline: true},
                { name: 'Role Required Commands', value: '`user remove all`', inline: true}
            )
            .setTimestamp()
            .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)',false);
		msg.channel.send({ embeds: [Embed] });
    }

    if(msg.content === `${prefix} help channel`) {
        const Embed = new MessageEmbed()
            .setColor('#4f1c82')
            .setTitle('Channel Help command')
			.setDescription('Help for Channel command.\nThis command retrieves a Channel using a Claim ID.')
            .addFields(
                { name: 'Commands', value: '`channel <claim id>`', inline: true}
            )
            .setTimestamp()
            .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)',false);
		msg.channel.send({ embeds: [Embed] });
    }

    if(msg.content === `${prefix} help claim`) {
        const Embed = new MessageEmbed()
            .setColor('#4f1c82')
            .setTitle('Claim Help command')
			.setDescription('Help for Claim command.\nThis command retrieves a Claim using a Claim ID.')
            .addFields(
                { name: 'Commands', value: '`claim <claim id>`', inline: true}
            )
            .setTimestamp()
            .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)',false);
		msg.channel.send({ embeds: [Embed] });
    }

    if(msg.content === `${prefix} help search`) {
        const Embed = new MessageEmbed()
            .setColor('#4f1c82')
            .setTitle('Search Help command')
			.setDescription('Help for Search command.\nThis command searchs Odysee/LBRY using the keyword you provide.')
            .addFields(
                { name: 'Commands', value: '`search <keyword>`', inline: true}
            )
            .setTimestamp()
            .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)',false);
		msg.channel.send({ embeds: [Embed] });
    }
}