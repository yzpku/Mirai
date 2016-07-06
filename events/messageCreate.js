var reload		= require('require-reload')(require),
	cleverbot	= reload('../special/cleverbot.js');

module.exports = {
	handler(bot, msg, CommandManagers, config, settingsManager) {
		if (msg.author.bot === true)
			return;

		for (let i = 0; i < CommandManagers.length; i++) {
			if (msg.content.startsWith(CommandManagers[i].prefix))
				return CommandManagers[i].processCommand(bot, msg, config, settingsManager);
		}

		if (config.cleverbot && msg.channel.guild === undefined || (msg.mentions.includes(bot.user.id) && msg.content.search(new RegExp(`^<@!?${bot.user.id}>`)) === 0))
			cleverbot(bot, msg);
	},
	reloadCleverbot(bot, channelId) {
		try {
			cleverbot = reload('../special/cleverbot.js');
			bot.createMessage(channelId, "Reloaded special/cleverbot");
		} catch (error) {
			console.log(error);
			bot.createMessage(channelId, `Error reloading cleverbot: ${error}`);
		}
	}
}
