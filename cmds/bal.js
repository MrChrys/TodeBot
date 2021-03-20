const { MessageEmbed } = require("discord.js")
const { table } = require('quick.db')
const db = new table('ec')

module.exports = {
    name: "bal",
    aliases: ["bag", "mochila"],
    tag: "economy",
    run: async(client, message, args, lang) => {
        const membro = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
        
        let money = db.get(membro.id+".money")
        if (!money) {
            db.set(membro.id+".money", 0);
            money = 0;
        }
        
        let frangos = db.get(membro.id+".frangos")
        if (!frangos) {
            db.set(message.author.id+".frangos", 0)
            frangos = 0
        }
        
        message.channel.send(new MessageEmbed()
        .setTitle(membro === message.author ? "Sua carteira" : `Carteira do(a) ${membro.username}`)
        .setColor("#149414")
        .setDescription("**<a:moeda:818177731228729395>Moedas**: **__"+money+`__**`)
        .addField("Mochila", `**🍗Frango(s)**: __${frangos}__`))
}
}