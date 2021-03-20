const { MessageEmbed } = require("discord.js")
const { table } = require('quick.db')
const db = new table('ec')
const ms = require("parse-ms")

module.exports = {
    name: "work",
    aliases: ["trabalhar", "t"],
    tag: "economy",
    run: async(client, message, args, lang) => {
        let mg = db.get(message.author.id+".premium") === true ? Math.floor(Math.random() * 7500) * 3 : Math.floor(Math.random() * 1500)
        let cooldown = 7200000;
        
        let a = db.get(`${message.author.id}.cooldown`)
        
        if (a && (cooldown - (Date.now() - a)) > 0 && message.author.id !== "334740922891894795") {
            const b = ms(cooldown - (Date.now() - a))
            message.channel.send(`Espere ${b.hours}:${b.minutes}:${b.seconds} para trabalhar novamente!`)
            return
        }
        db.add(`${message.author.id}.money`, mg)
        db.set(`${message.author.id}.cooldown`, Date.now())
        message.channel.send(new MessageEmbed()
        .setTitle("Trabalho: ")
        .setColor("#149414")
        .setDescription(`Você resgatou __${mg.toLocaleString()}__ moedas ${db.get(message.author.id+".premium") === true ? "por causa do premium" : ""} <a:moeda:818177731228729395>`))
    }
}