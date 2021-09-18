config_data = require('./../config/config.json')

module.exports = function(msg,prefix) {
    const MongoClient = require('mongodb').MongoClient,
    f = require('util').format;

    var url = f(`mongodb://${config_data.mongoUser}:${config_data.mongoPass}@${config_data.mongoURI}?authSource=admin`)

    MongoClient.connect(url, function(err, db) {
	    if(msg.content.startsWith(`${prefix} user`)) {
            if(msg.content.startsWith(`${prefix} user add`)) {
                if(msg.content.startsWith("odysee add add")) {
                    msg.channel.send('I am unable to do that command with "add".')
                }
                else {
                    const claim_ids = msg.content.replace(`${prefix} user add `, '').split(" ");
                    const guild_id = msg.channel.guild.id;

                    claim_ids.forEach(function(claimId) {
                        if (err) throw err;
        
                        var dbo = db.db(`discord_${guild_id}`);
                        dbo.collection("users").findOne({claimId:new RegExp('^' + claimId + '$', "i")}, function(err, user) {
                            if(err) {
                                console.log(err)
                            }
                            if(user) {
                                if(user.disabled === true) {
                                    dbo.collection("users").updateOne({ claimId: claimId }, { $set: { disabled: false } }, function(err, res) {
                                        if(err) throw err;
                                        msg.channel.send(`${claimId} has been added.`)
                                    })
                                }
                                else if(user.disabled === false) {
                                    msg.channel.send(`${claimId} exists.`)
                                }
                            }
                            else if(!user) {
                                dbo.collection("users").insertOne({ claimId: claimId, live: false, disabled: false, blacklisted: false }, function(err, res) {
                                    if(err) throw err;
                                    msg.channel.send(`${claimId} has been added.`)
                                })
                            }
                        })
                    })
                }
            }

            if(msg.content === `${prefix} user remove all`) {
                if(msg.member.roles.cache.some(role => role.name === 'Owner') || msg.member.roles.cache.some(role => role.name === 'Admin')) {
                    const guild_id = msg.channel.guild.id;

                    var dbo = db.db(`discord_${guild_id}`);
                    dbo.collection("users").find({}).toArray(function(err, users) {
                        if(err) {
                            console.log(err)
                        }

                        if(users.length >= 1) {
                            // Users
                            msg.channel.send(`Your claim id database will be wiped clean, it may take a few minutes if you have a lot of claim ids.`)
                            users.forEach(user => {
                                const claimId = user.claimId;
                                dbo.collection("users").deleteOne({ claimId: claimId }, function(err, res) {
                                    if(err) throw err;
                                })
                            })
                            msg.channel.send(`Your claim id database is wiped.`)
                        }
                        else if(users.length === 0) {
                            // No users
                            msg.channel.send("Your claim id database is empty.")
                        }
                    })
                }
                else {
                    msg.channel.send('This command requires you to have one of these role names: "Owner", "Admin"');
                }
            }

            if(msg.content.startsWith(`${prefix} user remove`) && msg.content !== "odysee remove all") {
                const claim_ids = msg.content.replace(`${prefix} user remove `, '').split(" ");
                const guild_id = msg.channel.guild.id;

                claim_ids.forEach(function(claimId) {
                    if (err) throw err;
        
                    var dbo = db.db(`discord_${guild_id}`);
                    dbo.collection("users").findOne({claimId:new RegExp('^' + claimId + '$', "i")}, function(err, user) {
                        if(err) {
                            console.log(err)
                        }
                        if(user) {
                            if(user.disabled === false) {
                                dbo.collection("users").updateOne({ claimId: claimId }, { $set: { disabled: true } }, function(err, res) {
                                    if(err) throw err;
                                    msg.channel.send(`${claimId} has been removed.`)
                                })
                            }
                            else if(user.disabled === true) {
                                msg.channel.send(`${claimId} does not exist.`)
                            }
                        }
                        else if(!user) {
                            msg.channel.send(`${claimId} does not exist.`)
                        }
                    })
                })
            }

            if(msg.content === `${prefix} user list`) {
                const guild_id = msg.channel.guild.id;

                var dbo = db.db(`discord_${guild_id}`);
                dbo.collection("users").find({}).toArray(function(err, users) {
                    if(err) {
                        console.log(err)
                    }

                    if(users.length >= 1) {
                        msg.channel.send(`Your claim id database has ${users.length} ids.`)
                    }
                    else if(users.length === 0) {
                        // No users
                        msg.channel.send("Your claim id database is empty.")
                    }
                })
            }
        }
    })
}