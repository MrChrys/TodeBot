const { MessageEmbed } = require("discord.js")
const { table } = require('quick.db')
const db = new table('pf')
const dd = new table('ec')

module.exports = {
    name: "perfil",
    aliases: ["profile", "p"],
    tag: "pfs",
    run: async(client, message, args, lang) => {
        let membro = message.mentions.users.first() || message.author
        let a = db.get(membro.id)
        const choice = args[0] ? args[0].toLowerCase() : ""
        
        if (!a) return
        
        let marry = db.get(membro.id+".marry")
        let married = client.users.fetch(marry)
        
        if (married instanceof Promise) {
            await married.then(a => married = a).catch(a => married = null)
        }
        
        if (!married) married = "Ninguém"
        
        if (choice === "desc") {
            const b = args.slice(1).join(" ")
            if (!b || b === "_ _") return
            db.set(membro.id+".desc", b)
            message.channel.send(`Descrição trocada para ${b}`)
        } else {
        message.channel.send(new MessageEmbed()
        .setTitle("Perfil de "+membro.username)
        .addField("Descrição", a.desc)
        .addField("Status da economia", `${dd.get(membro.id+".premium") === true ? "🏆 Premium" : "🥏 Casual"}`)
        .setFooter(`Use "${new table("ps").get(message.guild.id)}perfil desc" para mudar a descrição`)
        .addField(`Casado com`, married))
        }
    }
}