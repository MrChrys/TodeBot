const { ShardingManager, WebhookClient, MessageEmbed } = require('discord.js');
const hook = new WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN)

require('dotenv').config()

const shard = new ShardingManager('./bot.js', { 
    token: process.env.TOKEN,
    totalShards: "auto", 
    respawn: true,
});

shard.on('shardCreate', shard => {
    console.log(`[SHARD] - Iniciando shard ${shard.id}`)
    hook.send(new MessageEmbed()
    .setDescription(`[SHARD] - Shard ${shard.id} foi iniciada em ${new Date().getDate()}/${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1} ${new Date().getHours() -3}:${new Date().getMinutes() < 10 ? "0"+new Date().getMinutes() : new Date().getMinutes()}`))
});

shard.spawn();