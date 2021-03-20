const { MessageEmbed } = require("discord.js")
const { table } = require('quick.db')
const db = new table('pf')
const dd = new table('ec')

module.exports = {
    name: "marry",
    aliases: ["casar"],
    tag: "pfs",
    run: async(client, message, args, lang) => {
        
        let msg = message
        
    const target = message.mentions.users.first() || client.users.cache.get(args[0])
    if (!target || target === message.author) return message.channel.send(`${message.author} **|** você precisa casar com alguém valido po`)
    
    if (db.get(`${message.author.id}.marry`) || db.get(`${target.id}.marry`)) return message.channel.send(`${message.author} **|** você ou o usuário mencionado já esta casado(a)!`)
    
    message.channel.send(`${target}, ${msg.author} Pediu você em casamento, aceitar?`).then((m) => {
        m.react('❌').then(() => m.react("✅"))
        const filter = (reaction, user) => {
        return ['❌', '✅'].includes(reaction.emoji.name) && user.id === target.id; };
        m.awaitReactions(filter, { max: 1, errors: ['time'] }).then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === '✅') {
                msg.channel.send(new MessageEmbed()
                .setDescription(`${target.username} e ${msg.author.username} agora são casados :D`)
                .setFooter(`🤵 👰`));
                db.set(message.author.id+".marry", target.id)
                db.set(target.id+".marry", message.author.id)
                return m.delete()
                } else if (reaction.emoji.name === '❌') {
                msg.channel.send(new MessageEmbed()
                .setDescription(`${target.username} Rejeitou o casamento`))
                return m.delete()
                }
         })
         })
         
    }
}