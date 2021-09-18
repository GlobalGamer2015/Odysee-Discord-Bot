# Odysee-Discord-Bot

This bot supports multiple discords.
The official version of the bot is hosted on [Odysee Chatter](https://www.odysee-chatter.com) server.

This is a more advanced version Discord bot of [Odysee Discord Live Notification Bot](https://github.com/GlobalGamer2015/Odysee-Discord-Live-Notification-Bot).

Want to add this bot to your server? [Click me](https://discord.com/oauth2/authorize?client_id=884596611148312666&permissions=198656&scope=bot)

This bot requires
- [MongoDB](https://docs.mongodb.com/manual/administration/install-community/), I recommend using your server provider on setting MongoDB up, here is DigitalOcean's [Guide](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04-source)  
- [NodeJS v16.7.0](https://nodejs.org/en/download/current/)
- [LBRY SDK](https://github.com/lbryio/lbry-sdk)

In order to use the bot, type 'npm install' then 'nodemon' in the terminal or you can set it to run by itself 24/7 using [PM2](https://www.npmjs.com/package/pm2).

With this Discord bot, you can do the following commands.
* invite - Invite the Discord Bot to other servers.
* stats - View the Discord Bot statistics.
* channel - Retrieve a Odysee Channel from a Claim ID.
* claim - Retrieve a Odysee Claim from a Claim ID.
* search - Searches Odysee/LBRY using the keyword you provide.
* notify - Multi Command
  * notify content - Requires Owner or Admin role, set Discord Text Channel for when User content is uploaded.
  * notify stream - Requires Owner or Admin role, set Discord Text Channel for when User starts a stream.
* user - Multi Command
  * user add 'Claim ID' - Add Claim ID to database.
  * user remove 'Claim ID' - Remove Claim ID from database.
  * user remove all - Requires Owner or Admin role, wipes database.
* help - Multi Command. Shows all commands.
  * help invite
  * help stats
  * help channel
  * help claim
  * help notify
  * help user
  * help search