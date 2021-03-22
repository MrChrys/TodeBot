/*
 __     __                 _                          _       
 \ \   / /   __ _   _ __  (_)   __ _  __   __   ___  (_)  ___ 
  \ \ / /   / _` | | '__| | |  / _` | \ \ / /  / _ \ | | / __|
   \ V /   | (_| | | |    | | | (_| |  \ V /  |  __/ | | \__ \
    \_/     \__,_| |_|    |_|  \__,_|   \_/    \___| |_| |___/
*/
const { Client, Collection, MessageEmbed, Intents, WebhookClient } = require("discord.js")
const client = new Client({ws: { intents: Intents.All }})
client.cmds = new Collection()
client.lang = {}
// 
const { env, config } = require('process');
require('dotenv').config();

const express = require("express");
const app = express();

const fs = require("fs");

app.listen(Math.floor(Math.random()));
app.get('/', function(req, res) {
	res.send('⁰');
});
const { table } = require("quick.db")
const db = new table('ps')
const s = new table(`ls`)
const bl = new table("bl")
let { owners } = require("./config.json")
const p = new table('pf')

const hook = new WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN)

/*
  _   _                       _   _               
 | | | |   __ _   _ __     __| | | |   ___   _ __ 
 | |_| |  / _` | | '_ \   / _` | | |  / _ \ | '__|
 |  _  | | (_| | | | | | | (_| | | | |  __/ | |   
 |_| |_|  \__,_| |_| |_|  \__,_| |_|  \___| |_|
*/
client.idiomas = {}
require("./languages/en")(client)
require("./languages/pt")(client)
const files = fs.readdirSync('./cmds/').filter(file => file.endsWith('.js'));

for (const file of files) {
const cmd = require(`./cmds/${file}`)
client.cmds.set(cmd.name, cmd)
}

/*
  _____                          _                 
 | ____| __   __   ___   _ __   | |_    ___    ___ 
 |  _|   \ \ / /  / _ \ | '_ \  | __|  / _ \  / __|
 | |___   \ V /  |  __/ | | | | | |_  | (_) | \__ \
 |_____|   \_/    \___| |_| |_|  \__|  \___/  |___/
*/
client.on("ready", async() => {
    console.log(`O bot ${client.user.tag} está online!`)
})

client.login(process.env.TOKEN)

client.on("message", async(message) => {
    if (!p.get(message.author.id)) {
        p.set(message.author.id+".desc", "dá uma sugada...")
    }
    let lang = s.get(message.guild.id) || 'pt'
    
    if (lang === 'en') lang = client.idiomas.en
    if (lang === 'pt') lang = client.idiomas.pt
    
    let prefix = db.get(`${message.guild.id}`)
    if (!prefix) {
        db.set(message.guild.id, "*")
        prefix = "*"
    }
    
    if (message.author.bot || !message.content.startsWith(prefix)) return
    
    if (bl.get(message.author.id) === true) return message.channel.send("você não pode usar meus comandos >:《")
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmdn = args.shift().toLowerCase()
    const cmd = client.cmds.get(cmdn) || client.cmds.find(cu => cu.aliases && cu.aliases.find(a => a === cmdn))
    if (!cmd) return
    if (cmd.onlyDev && !owners.find(a => a === message.author.id)) return message.channel.send(lang.od)
    
    try {
    cmd.run(client, message, args, lang)
    hook.send(new MessageEmbed()
    .setTitle("Comando executado")
    .addField("Autor", message.author.tag)
    .addField("Comando", cmdn)
    .addField("Args", args[0] ? args.join(" ") : "none")
    .addField("Horário", `${new Date().getDate()}/${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1} ${new Date().getHours() -3}:${new Date().getMinutes() < 10 ? "0"+new Date().getMinutes() : new Date().getMinutes()}`))
    } catch(e) {
        message.channel.send(`${message.author} **|** ocorreu um erro:\`\`\`js\n${e}\`\`\``)
    }
});

client.on("guildCreate", async(guild) => {
    hook.send(new MessageEmbed()
    .setDescription(`Me convidaram no servidor ${guild.name}[${guild.id}] criado por ${guild.owner.user.tag} com ${guild.members.cache.size - 1} membros`))
});

client.on("guildDelete", async(guild) => {
    hook.send(new MessageEmbed()
    .setDescription(`Me retiraram do servidor ${guild.name}[${guild.id}] criado por ${guild.owner.user.tag} com ${guild.members.cache.size} membros`))
});