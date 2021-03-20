const { MessageEmbed } = require("discord.js")
const { table } = require("quick.db")
const db = new table("bl")

module.exports = {
    name: "bl",
    tag: "dev",
    onlyDev: true,
    run: async(client, message, args, lang) => {
        let b = []
        if (!args[0]) {
            client.users.cache.filter(a => db.get(a.id) === true).forEach((a) => {
b.push(`${a.username}[${a.id}]`)
})
            message.channel.send(b.join("\n"))
            return
        }
        
        let choose = args[0].toLowerCase()
        
        if (choose === "add") {
            const user = message.mentions.users.first() || client.users.cache.get(args[1])
            db.set(user.id, true)
            message.channel.send(`${message.author} **|** o usuário foi banido de usar meus comandos 👻`)
        }
        if (choose === "remove") {
            const user = message.mentions.users.first() || client.users.cache.get(args[1])
            db.delete(user.id)
            message.channel.send(`${message.author} **|** o usuário pode usar meus comandos novamente!!!! 👻`)
        }
    }
}