const { table } = require("quick.db");
const db = new table("ps")
let { owners } = require("../config.json")

module.exports = {
    name: "setprefix",
    aliases: ["prefix"],
    tag: "util",
    run: async(client, message, args, lang) => {
        if (!message.member.hasPermission("MANAGE_GUILD") && !owners.includes(message.author.id)) return message.channel.send(lang.pn.replace(/author/g, message.author))
        if (!args[0]) return message.channel.send(lang.pe.replace(/author/g, message.author))
        if (args[0].length > 4) return
        db.set(message.guild.id, args[0])
        message.channel.send(lang.ss.replace(/author/g, message.author).replace(/cu/g, args[0]))
    }
}