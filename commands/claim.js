const Lbry = require('lbry-sdk-nodejs/lib/sdk');

module.exports = function(msg,prefix,MessageEmbed) {
	if(msg.content.startsWith(`${prefix} claim`)) {
        const claim_id = msg.content.replace(`${prefix} claim `, '').split(" ");

        Lbry.Lbry.claim_search({claim_id: claim_id})
        .then(claim => {
            try {
                if(claim.items[0].short_url !== claim.items[0].canonical_url) {
                    const claimUrl = claim.items[0].short_url.replace('lbry://', 'https://www.odysee.com/');
                    const Embed = new MessageEmbed()
                        .setColor('#4f1c82')
                        .setAuthor(`Title: ${claim.items[0].name}`, `${claim.items[0].value.thumbnail.url}`, claimUrl)
                        .setTimestamp()
                        .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)', false);
		            msg.channel.send({ embeds: [Embed] });
                }
                else {
                    msg.channel.send(`${claim_id} is a channel, please use the channel command.`);
                }
            }
            catch(e) {
                console.log(e)
            }
        })
    }
}