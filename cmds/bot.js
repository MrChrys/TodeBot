const { MessageEmbed } = require('discord.js')
const moment = require("moment")
const { table } = require('quick.db')
const db = new table('ec')

module.exports = {
    name: "bot",
    aliases: ["b"],
    tag: "util",
    run: async(client, message, args, lang) => {
        let url = "https://discord.com/oauth2/authorize?client_id=BOTID&permissions=8&response_type=code&scope=SCOPES"
        
        let membro = message.mentions.users.first() || client.users.cache.find(a => a.username.includes(args.join(" ")))|| client.users.fetch(args[0])
        
        if (membro instanceof Promise) {
            await membro.then(a => membro = a).catch(n => membro = null)
        }
        
        if (!membro || !membro.bot) return
        
        message.channel.send(new MessageEmbed()
        .setTitle(membro.username)
        .addField("ADD", `[Admin Perms](${url.replace(/BOTID/g, membro.id).replace(/SCOPES/g, "bot")})\n\n[No Perms](${url.replace(/BOTID/g, membro.id).replace(/SCOPES/g, "bot").replace(/8/g, "0")})`))
    }
}