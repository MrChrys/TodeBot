const Discord = require("discord.js")

isEmoji = function(emoji) {
	const e = Discord.Util.parseEmoji(emoji);

	if (e.id === null) {
		return {
			name: e.name,
			id: e.id,
			animated: e.animated,
			response: false
		};
	} else {
		return {
			name: e.name,
			id: e.id,
			animated: e.animated,
			response: true
		};
	}
};

module.exports = {
	name: 'emj',
	tag: 'util', //utility, fun, mod, others
	run: async(client, msg, args, lang) => {
		let emoji = client.emojis.cache.find(a => a.name === args[0]) || args[0];
		if (!emoji) return;
		let id = '';
		let name = '';
		if (emoji === client.emojis.cache.find(a => a.name === args[0])) {
			name = emoji.name;
			id = emoji.id;
			emoji = `<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>`;
		}
		if (isEmoji(emoji).response == false)
			return msg.channel.send('Emoji invalido fióte');
		msg.channel.send('`' + emoji + '`');
}
}