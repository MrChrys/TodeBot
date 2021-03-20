const { MessageEmbed } = require("discord.js")
const { table } = require('quick.db')
const db = new table('pf')
const dd = new table('ec')

module.exports = {
    name: "divorce",
    aliases: ["divocriar"],
    tag: "pfs",
    run: async(client, message, args, lang) => {
        
        let marry = db.get(`${message.author.id}.marry`)

        let married = client.users.fetch(marry)
        
        if (married instanceof Promise) {
            await married.then(a => married = a).catch(a => married = null)
        }
        
        if (!married) return message.channel.send(`${message.author} **|** você não está casado com ninguém!`)
        
        married.send(`${message.author.username} se divorciou com você! 😭`)
        message.channel.send(`${message.author} se divorciou com ${married.username}`)
        db.delete(`${married}.marry`)
        db.delete(`${message.author.id}.marry`)
    }
}