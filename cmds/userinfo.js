const { MessageEmbed } = require('discord.js')
const moment = require("moment")
const { table } = require('quick.db')
const db = new table('ec')

module.exports = {
    name: "userinfo",
    aliases: ["ui"],
    tag: "util",
    run: async(client, message, args, lang) => {
        let membro = message.mentions.users.first() || client.users.fetch(args[0]) || message.author
        
        if (membro instanceof Promise) {
            await membro.then(a => membro = a).catch(n => membro = null)
        }
        
        if (!membro) {
            membro = message.author
        }
        let premium = db.get(membro.id+".premium")
        if (!premium) {
            db.set(membro.id+".premium", false)
            premium = false
        }
        message.channel.send(new MessageEmbed()
        .setColor("7289DA")
        .setTitle(membro.tag)
        .addField(`ID`, membro.id)
        .setThumbnail(membro.displayAvatarURL({ dynamic: true }))
        .addField(lang.cc, moment(membro.createdAt).format(`DD/MM/YYYY HH:mm`))
        .addField(`Custom status`, membro.presence.activities[0] ? membro.presence.activities[0].state : "Nenhum.")
        .addField(`Status da economia`, premium === true ? "Premium" : "Casual" ))
    }
}