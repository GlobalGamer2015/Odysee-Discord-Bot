module.exports = function(msg,prefix) {
	if(msg.content === `${prefix} invite`) {
        msg.channel.send(`Want to invite Odysee bot to your server? Go over to https://discord.com/oauth2/authorize?client_id=884596611148312666&permissions=198656&scope=bot to add me.`)
    }
}