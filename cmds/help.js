const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    aliases: ["ajuda"],
    tag: "util",
    run: async(client, message, args, lang) => {
        message.channel.send(new MessageEmbed()
        .setTitle(client.lang.ht)
        .setColor("7289DA")
        .addField(lang.hu, `${client.cmds.filter(a => a.tag === "util").map(a => "`"+a.name+"`").join(", ")}`)
        .addField(lang.hd, `${client.cmds.filter(a => a.tag === "dev").map(a => "`"+a.name+"`").join(", ")}`)
        .addField(lang.he, `${client.cmds.filter(a => a.tag === "economy").map(a => "`"+a.name+"`").join(", ")}`)
        .addField(lang.hp, `${client.cmds.filter(a => a.tag === "pfs").map(a => "`"+a.name+"`").join(", ")}`))
    }
}