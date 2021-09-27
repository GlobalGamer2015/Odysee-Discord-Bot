const fetch = require('node-fetch');
const Guild = require('./../models/guild');
const Discord = require('discord.js');
config_data = require('./../config/config.json')

module.exports = function(bot) {

    const MongoClient = require('mongodb').MongoClient,
    f = require('util').format;

    const url = f(`mongodb://${config_data.mongoUser}:${config_data.mongoPass}@${config_data.mongoURI}?authSource=admin`)
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        setInterval(function() {
            Guild.find({},(err,guilds)=> {
                if(err) {
                    console.log(err)
                }
                guilds.forEach(function(guild){
                    const Guild_Id = guild.id;

                    db.db().admin().listDatabases().then(dbs => {
                        const databases = dbs.databases;
                        databases.forEach(function(database) {
                            const database_name = database.name;
                            if(database_name === `discord_${Guild_Id}`) {
                                var dbo = db.db(database_name);
                                dbo.collection("users").find({}).toArray(function(err, users) {
                                    if(err) {
                                        console.log(err)
                                    }
                                    users.forEach(function(user) {
                                        const claim_id = user.claimId;
                                        if(user.blacklisted === false) {
                                            try {
                                                fetch(`https://api.live.odysee.com/v1/odysee/live/${claim_id}`, {
                                                    method: 'get',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    }
                                                })
                                                .then(res => res.json())
                                                .then(channel => {
                                                    if(channel.data.live === false) {
                                                        if(user.live === true) {
                                                            dbo.collection("users").updateOne({claimId: claim_id}, { $set: {live: false} }, function(err, res) {
                                                                if(err) {
                                                                    console.log(err)
                                                                }
                                                            })
                                                        }
                                                    }
                                                    else if(channel.data.live === true) {
                                                        if(user.live === false) {
                                                            fetch("https://chainquery.lbry.com/api/sql?query=SELECT%20*%20FROM%20claim%20WHERE%20publisher_id=%22" + claim_id + "%22%20AND%20bid_state%3C%3E%22Spent%22%20AND%20claim_type=1%20AND%20source_hash%20IS%20NULL%20ORDER%20BY%20id%20DESC%20LIMIT%201", {
                                                                method: 'get',
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                }
                                                            }).then(ChainQuery_res => ChainQuery_res.json())
                                                            .then(stream => {
                                                                if(stream.data[0].thumbnail_url) {
                                                                    const channel_name = channel.data.claimData.name;
                                                                    const channelLink = channel.data.claimData.channelLink;
                                                                    const stream_name = stream.data[0].name;
                                                                    const thumbnail = stream.data[0].thumbnail_url;
                                                                    const stream_url = channelLink+'/'+stream_name;
                                                                        
                                                                    dbo.collection("users").updateOne({claimId: claim_id}, {$set: { live: true }}, function(err, res) {
                                                                        if(err) {
                                                                            console.log(err)
                                                                        }
                                                                    })
                                                                    
                                                                    dbo.collection("users").findOne({claimId: claim_id}, function(err, user) {
                                                                        if(err) {
                                                                            console.log(err)
                                                                        }

                                                                        if(user) {
                                                                            const Embed = new Discord.MessageEmbed()
                                                                                .setColor('#4f1c82')
                                                                                .setTitle(`${channel_name} just went live!`)
                                                                                .setURL(stream_url)
                                                                                .setAuthor(`Streamer: ${channel_name}`, 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Odyssey_logo_1.svg/220px-Odyssey_logo_1.svg.png', channelLink)
                                                                                .setImage(thumbnail)
                                                                                .setTimestamp()
                                                                                .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)',true);
                                                                            if(guild.disabled === false) {
                                                                                if(guild.data.notification_stream_channel === "") {
                                                                                    // Do nothing
                                                                                }
                                                                                else {
                                                                                    bot.channels.cache.get(guild.data.notification_stream_channel).send({ embeds: [Embed] });
                                                                                }
                                                                            }
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                            catch (error) {
                                                console.log(error)
                                            }
                                        }
                                    })
                                })
                            }
                        })
                    })
                })
            })
        },60000)
    });
}