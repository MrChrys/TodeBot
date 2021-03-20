const { MessageEmbed } = require("discord.js")
const { table } = require('quick.db')
const db = new table('ec')

module.exports = {
    name: "give",
    aliases: ["dar"],
    tag: "economy",
    run: async(client, message, args, lang) => {
        const membro = message.author
        const target = message.mentions.users.first() || client.users.cache.get(args[0])
        
        if (!target) return message.channel.send(`${message.author} **|** Você percisa mencionar alguem!`)
        
        let frangos = db.get(membro.id+".frangos")
        if (!frangos) {
            db.set(membro.id+".frangos", 0)
            frangos = 0
        }
        
        let money = db.get(membro.id+".money")
        if (!frangos) {
            db.set(membro.id+".money", 0)
            money = 0
        }
        
        if (!args[1]) return message.channel.send(`${message.author} **|** Você precisa especificar um item\nex: frango, moeda`)
        if (!args[2]) return message.channel.send(`${message.author} **|** Você percisa especificar a quantidade á dar`)
        
        const item = args[1].toLowerCase()
        const amount = args[2]
        
        if (item === "frango") {
            if (frangos < amount) return
            db.subtract(membro.id+".frangos", amount)
            db.add(target.id+".frangos", amount)
            message.channel.send(`Você enviou ${amount} frangos para ${target}`)
        } else if (item === "moeda") {
            if (money < amount) return
            db.subtract(membro.id+".money", amount)
            db.add(target.id+".money", amount)
            message.channel.send(`Você enviou ${amount} moedas para ${target}`)
        } else return message.channel.send(`${message.author} **|** Você precisa especificar um item valido!\nex: frango, moeda`)
}
}