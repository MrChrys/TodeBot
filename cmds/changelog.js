const { table } = require("quick.db")
const db = new table("cl")
const { MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: "changelog",
    tag: "util",
    run: async(client, msg, args, lang) => {
        const atumalaca = async(cu, cabeludo) => {
    msg.channel.send(new MessageEmbed()
    .setTitle(cu)
    .setDescription(cabeludo))
}
        const cu = args[0]
         if (!cu) {
            atumalaca(db.get("changelog") ? `Changelog - ${db.get(`changelog.when`)}` : "Não setado ainda", db.get("changelog") ? db.get(`changelog.ct`) : "Não setado ainda")
            return
         }
        const c = cu.toLowerCase()
       if (c === "set") {
            if (!["334740922891894795"].includes(msg.author.id)) return
            const cuca = args.slice(1).join(" ")
            db.set("changelog.ct", cuca)
            db.set("changelog.when", moment().format(`DD/MM/YY`))
            atumalaca(db.get("changelog") ? `Changelog - ${db.get(`changelog.when`)}` : "Não setado ainda", db.get("changelog") ? db.get(`changelog.ct`) : "Não setado ainda")
        }
    }
}
