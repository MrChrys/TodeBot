const { table } = require("quick.db");
const db = new table("ps");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "botinfo",
    aliases: ["bi", "about"],
    tag: "util",
    run: async(client, message, args, lang) => {
        message.channel.send(new MessageEmbed()
        .setTitle("Saiba mais sobre mim")
        .setDescription(`Criador: \`${client.users.cache.get("334740922891894795").tag}\`\nPrefixo neste servidor: \`${db.get(message.author.id) || "*"}\`\n\n<:yt:818621653742518342>[Canal do meu criador](https://youtube.com/channel/UC2Wj6WreNfuB9C0w5IFKnvA)\n<:yt:818621653742518342>[Canal de programação do meu criador](https://youtube.com/channel/UCI16pLUZTN4IAhG2LAiS_cw)\n<:tt:818628884559691776>[Twitter](https://twitter.com/ChrysthopherKh1?s=09)`))
    }
}