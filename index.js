config_data = require('./config/config.json');
const prefix = "odysee";

const mongoose = require('mongoose');
const mongoURI = `mongodb://${config_data.mongoUser}:${config_data.mongoPass}@${config_data.mongoURI}/database?authSource=admin`;
const options = {
    keepAlive: "true",
    keepAliveInitialDelay: "300000",
    useNewUrlParser: "true",
	useUnifiedTopology: true
};
mongoose.connect(mongoURI, options);

const { Client, Intents, MessageEmbed } = require("discord.js");
const bot = new Client({
	forceFetchUsers: true,
	autoReconnect: true,
	intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ],
	presence: {
        status: 'online',
        afk: false,
        activities: [{
            name: 'Odysee! Type "odysee help" for commands!',
            type: 'WATCHING'
        }],
    },
});

bot.on("ready", () => {
	console.log(`Discord Bot Connected`)
});

// Modules
const guildCreate = require('./modules/guildCreate')(bot)
const guildDelete = require('./modules/guildDelete')(bot)
const streaming = require('./modules/streaming')(bot)
const content = require('./modules/content')(bot)

bot.on("messageCreate", (msg) => {
	if(msg.author.bot) return;

    // Help command
    help = require('./commands/help')(msg,prefix,MessageEmbed);

    // Invite
    invite = require('./commands/invite')(msg,prefix);

    // Stats
    stats = require('./commands/stats')(msg,prefix,MessageEmbed,bot);

    // Channel
    channel = require('./commands/channel')(msg,prefix,MessageEmbed);

    // Claim
    claim = require('./commands/claim')(msg,prefix,MessageEmbed)

    // Notify
    notify = require('./commands/notify')(msg,prefix,bot)

    // User
    user = require('./commands/user')(msg,prefix)

    // Search
    search = require('./commands/search')(msg,prefix,MessageEmbed)
});

bot.login(config_data.bot_token);