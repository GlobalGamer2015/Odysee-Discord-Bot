const Guild = require('./../models/guild');
const Discord = require('discord.js');
const config_data = require('./../config/config.json');
const { Lbry } = require('lbry-sdk-nodejs/lib/sdk');
const WS = require('ws');

const blockchain_data = require('./../blockchain_data/data');

module.exports = function(bot, logger) {

  const MongoClient = require('mongodb').MongoClient,
  f = require('util').format;

  const url = f(`mongodb://${config_data.mongoUser}:${config_data.mongoPass}@${config_data.mongoURI}?authSource=admin`);
    
  MongoClient.connect(url, function(err, db) {
    const socket = new WS('wss://sockety.odysee.com/ws/blockchain?id=claims');

    socket.addEventListener('message', function (event) {
      try {
        console.log(event.data)
        const data = JSON.parse(event.data);
        
        // variables
        const type = data.type;

        if(type === 'new_claim') {
          // const claim_address = data.data.claim.claim_address;
          // const claim_id = data.data.claim.claim_id;
          // const claim_name = data.data.claim.name;
          // const claim_type = data.data.claim.claim_type;
          const content_type = data.data.claim.content_type;
          // const created_at = data.data.claim.created_at;
          // const is_nsfw = data.data.claim.is_nsfw;
          // const name = data.data.claim.name;
          const publisherId = data.data.claim.publisher_id; // Publisher ID is Channel Claim ID

          if(data.data.claim.height >= 1) {
            if(content_type !== null) {
              Lbry.claim_search({claim_id: publisherId})
              .catch(err => {
                console.log(err);
                logger.error(`Date: ${Date.now()}\nCL: 39\nError Name: ${err.name}\nError Message: ${err.message}\nError Stack: ${err.stack}\n`);
              })
              .then(claim => {
                if(claim) {
                  if(claim.items[0]) {
                    Guild.find({},(err,guilds)=> {
                      if(err) {
                        console.log(err);
                        logger.error(`Date: ${Date.now()}\nCL: 46\nError Name: ${err.name}\nError Message: ${err.message}\nError Stack: ${err.stack}\n`);
                      }
                      guilds.forEach(function(guild){
                        const Guild_Id = guild.id;
                        db.db().admin().listDatabases().then(dbs => {
                          const databases = dbs.databases;
                          databases.forEach(function(database) {
                            const database_name = database.name;
                            if(database_name === `discord_${Guild_Id}`) {
                              const dbo = db.db(database_name);
                              dbo.collection('users').findOne({claimId: publisherId}, function(err, user) {
                                if(err) {
                                  console.log(err);
                                  logger.error(`Date: ${Date.now()}\nCL: 59\nError Name: ${err.name}\nError Message: ${err.message}\nError Stack: ${err.stack}\n`);
                                }

                                if(user) {
                                  if(content_type.startsWith('image/')) {
                                    const Embed = new Discord.MessageEmbed()
                                      .setColor('#4f1c82')
                                      .setAuthor(`User: ${claim.items[0].name}`, 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Odyssey_logo_1.svg/220px-Odyssey_logo_1.svg.png', `${blockchain_data.url(data,claim)}`)
                                      .setTitle(`Name: ${blockchain_data.name(data)}\nContent Type: ${blockchain_data.content_type(data)}`)
                                      .setImage(blockchain_data.thumbnail(data))
                                      .setTimestamp()
                                      .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)',true);
                                    if(guild.disabled === false) {
                                      if(guild.data.notification_content_channel === '') {
                                        // Do nothing
                                      }
                                      else {
                                        bot.channels.cache.get(guild.data.notification_content_channel).send({ embeds: [Embed] });
                                      }
                                    }
                                  }
                                  if(content_type.startsWith('video/')) {
                                    const Embed = new Discord.MessageEmbed()
                                      .setColor('#4f1c82')
                                      .setAuthor(`User: ${claim.items[0].name}`, 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Odyssey_logo_1.svg/220px-Odyssey_logo_1.svg.png', `${blockchain_data.url(data,claim)}`)
                                      .setTitle(`Name: ${blockchain_data.name(data)}\nContent Type: ${blockchain_data.content_type(data)}\nDuration: ${blockchain_data.duration(data)}`)
                                      .setImage(blockchain_data.thumbnail(data))
                                      .setTimestamp()
                                      .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)',true);
                                    if(guild.disabled === false) {
                                      if(guild.data.notification_content_channel === '') {
                                        // Do nothing
                                      }
                                      else {
                                        bot.channels.cache.get(guild.data.notification_content_channel).send({ embeds: [Embed] });
                                      }
                                    }
                                  }
                                  if(content_type.startsWith('text/')) {
                                    const Embed = new Discord.MessageEmbed()
                                      .setColor('#4f1c82')
                                      .setAuthor(`User: ${claim.items[0].name}`, 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Odyssey_logo_1.svg/220px-Odyssey_logo_1.svg.png', `${blockchain_data.url(data,claim)}`)
                                      .setTitle(`Name: ${blockchain_data.name(data)}\nContent Type: ${blockchain_data.content_type(data)}`)
                                      .setImage(blockchain_data.thumbnail(data))
                                      .setTimestamp()
                                      .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)',true);
                                    if(guild.disabled === false) {
                                      if(guild.data.notification_content_channel === '') {
                                        // Do nothing
                                      }
                                      else {
                                        bot.channels.cache.get(guild.data.notification_content_channel).send({ embeds: [Embed] });
                                      }
                                    }
                                  }
                                }
                              });
                            }
                          });
                        });
                      });
                    });
                  }
                }
              });
            }
          }
        }
      }
      catch(err) {
        logger.error(`Date: ${Date.now()}\nCL: 20\nCatch Error Message: ${err.message}\n`);
      }
    });
  });
};
