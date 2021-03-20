const { table } = require('quick.db')
const db = new table("ls")
const { MessageEmbed } = require('discord.js')
const { owners } = require("../config.json")

module.exports = {
    name: "setlang",
    tag: "util",
    run: async(client, message, args, lang) => {
        if (!message.member.hasPermission("MANAGE_GUILD") && !owners.includes(message.author.id)) return
        let langs = [
        "pt",
        "en"
        ]
        if (!args[0]) {
            message.channel.send(new MessageEmbed()
            .setColor("7289DA")
            .setTitle("Linguas disponiveis | Disponible languages")
            .setDescription(`\`pt\` - Português(Brasil)\n\`en\` - Inglês`))
        } else {
            if (!langs.find(a => a === args[0])) return
            db.set(message.guild.id, args[0])
            await message.channel.send(lang.ls.replace(/var/g, args[0]))
        }
    }
}