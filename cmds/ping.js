module.exports = {
    name: "ping",
    aliases: ["latencia"],
    tag: "util",
    run: async(client, message, args, lang) => {
        message.channel.send(`${message.author} **|** Ping\n\n**Bot**: \`${client.ws.ping}ms\`\n**${lang.pt}**: \`${Date.now() - message.createdTimestamp}ms\``)
    }
}