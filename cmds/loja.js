const { MessageEmbed } = require("discord.js")
const { table } = require('quick.db')
const db = new table('ec')

module.exports = {
    name: "loja",
    aliases: ["shop"],
    tag: "economy",
    run: async(client, message, args, lang) => {
        const choose = args[0]
        
        let money = db.get(message.author.id+".money")
        if (!money) {
            db.set(message.author.id+".money", 0);
            money = 0;
        }
        /*
  ___   _                        
 |_ _| | |_    ___   _ __    ___ 
  | |  | __|  / _ \ | '_ \  / __|
  | |  | |_  |  __/ | | | | \__ \
 |___|  \__|  \___| |_| |_| |___/
        */
        if (!choose) {
            message.channel.send(new MessageEmbed()
            .setTitle("Loja")
            .setDescription(`**PREMIUM** — 10,000 moedas\n   [ ID: 0 ]\n**🍗 FRANGO** — 50 moedas\n    [ ID: 1 ]`))
            return
        } else if (choose === "0") {
            if (db.get(message.author.id+".premium") === true) return message.channel.send("você já tem o premium!")
            if (money < 10000) return message.channel.send("você precisa de 10,000 moedas pelo menos para comprar o premium!")
            db.set(message.author.id+".premium", true)
            db.subtract(message.author.id+".money", 10000)
            message.channel.send("Você comprou o premium por 10,000 moedas!")
            /*
            
            
            */
        } else if (choose === "1") {
            if (db.get(message.author.id+".frangos") > 10) return message.channel.send("Sua mochila esta cheia de frangos!")
            if (money < 50) return message.channel.send("você precisa de 50 moedas pelo menos para comprar o frango!")
            db.add(message.author.id+".frangos", 1)
            db.subtract(message.author.id+".money", 50)
            message.channel.send("Você comprou um frango por 50 moedas!")
        }
    }
}