const Lbry = require('lbry-sdk-nodejs/lib/sdk');

module.exports = function(msg, prefix, MessageEmbed, logger) {
	if(msg.content.startsWith(`${prefix} channel`)) {
        const claim_id = msg.content.replace(`${prefix} channel `, '').split(" ");

        Lbry.Lbry.claim_search({claim_id: claim_id})
        .catch(err => {
            console.log(err)
            logger.error(`Date: ${Date.now()}\nCL: 7\nError Name: ${err.name}\nError Message: ${err.message}\nError Stack: ${err.stack}\n`)
        })
        .then(channel => {
            try {
                if(channel.items[0].short_url === channel.items[0].canonical_url) {
                    const channelUrl = channel.items[0].short_url.replace('lbry://', 'https://www.odysee.com/');
                    const Embed = new MessageEmbed()
                        .setColor('#4f1c82')
                        .setAuthor(`Channel: ${channel.items[0].name}`, `${channel.items[0].value.thumbnail.url}`, channelUrl)
                        .setTimestamp()
                        .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)', false);
		            msg.channel.send({ embeds: [Embed] });
                }
                else {
                    msg.channel.send(`${claim_id} is not a channel.`);
                }
            }
            catch(err) {
                console.log(err)
            }
        })
    }
}