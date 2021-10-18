const config_data = require('./config/config.json');
const prefix = 'odysee';

const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

const mongoose = require('mongoose');
const mongoURI = `mongodb://${config_data.mongoUser}:${config_data.mongoPass}@${config_data.mongoURI}/database?authSource=admin`;
const options = {
  keepAlive: 'true',
  keepAliveInitialDelay: '300000',
  useNewUrlParser: 'true',
	useUnifiedTopology: true
};
mongoose.connect(mongoURI, options);

let isConnected = false;
function ConnectToDiscord() {
  const { Client, Intents, MessageEmbed } = require('discord.js');
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

  bot.on('ready', () => {
    console.log('Discord Bot Connected');
  });

  // Modules
  const guildCreate = require('./modules/guildCreate')(bot, logger);
  const guildDelete = require('./modules/guildDelete')(bot, logger);
  const streaming = require('./modules/streaming')(bot, logger);
  const content = require('./modules/content')(bot, logger);

  bot.on('messageCreate', (msg) => {
    if(msg.author.bot) return;

    // Help command
    help = require('./commands/help')(msg, prefix, MessageEmbed);

    // Invite
    invite = require('./commands/invite')(msg,prefix);

    // Stats
    stats = require('./commands/stats')(msg, prefix, MessageEmbed, bot, logger);

    // Channel
    channel = require('./commands/channel')(msg, prefix, MessageEmbed, logger);

    // Claim
    claim = require('./commands/claim')(msg, prefix, MessageEmbed, logger);

    // Notify
    notify = require('./commands/notify')(msg, prefix, bot, logger);

    // User
    user = require('./commands/user')(msg, prefix, logger);

    // Search
    search = require('./commands/search')(msg, prefix, MessageEmbed, logger);
  });

  bot.login(config_data.bot_token);
}

// Adding this to prevent discord from messaging me about
// the bot connecting over 1k times in a short period of time.
// Check if connected to database, if not then try again.
if(mongoose.connection.readyState !== 1) {
  setInterval(() => {
    if(mongoose.connection.readyState === 1 && isConnected === false) {
      ConnectToDiscord();
      isConnected = true;
    }
  },30000);
}
// If connected to database then connect
else if(mongoose.connection.readyState === 1) {
  ConnectToDiscord();
  isConnected = true;
}
