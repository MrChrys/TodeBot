const { MessageEmbed } = require("discord.js")
const { table } = require('quick.db')
const db = new table('ec')

module.exports = {
    name: "sell",
    aliases: ["vender"],
    tag: "economy",
    run: async(client, message, args, lang) => {
        const membro = message.author
        
        let frangos = db.get(membro.id+".frangos")
        if (!frangos) {
            db.set(membro.id+".frangos", 0)
            frangos = 0
        }
        
        if (!args[0]) return message.channel.send(`${message.author} **|** Você precisa especificar um item\nex: frango`)
        if (!args[1]) return message.channel.send(`${message.author} **|** Você percisa especificar a quantidade á vender`)
        
        const item = args[0].toLowerCase()
        const amount = args[1]
        const cost = Math.floor(Math.random() * 200)
        
        if (item === "frango") {
            if (frangos < amount || amount < 1) return
            db.subtract(membro.id+".frangos", amount)
            db.add(membro.id+".money", cost*amount)
            message.channel.send(`Alguem se interesou pela sua venda e comprou ${amount} frango(s) por ${cost*amount}!`)
        } else return message.channel.send(`${message.author} **|** Você precisa especificar um item valido!\nex: frango`)
}
}