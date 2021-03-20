const { ShardingManager, WebhookClient, MessageEmbed } = require('discord.js');
const hook = new WebhookClient("822479884902465566", "LkFq1HH3eV0LIOvgGb_06HVfEq7HhxDoWn1c-D5MrMCLwDm7ILEtG1U5b98ZxlZhYGX8")
const shard = new ShardingManager('./bot.js', { 
    totalShards: 2, 
    respawn: true,
});

shard.on('shardCreate', shard => {
    console.log(`[SHARD] - Iniciando shard ${shard.id}`)
    hook.send(new MessageEmbed()
    .setDescription(`[SHARS] - Shard ${shard.id} foi iniciada em ${new Date().getDate()}/${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1} ${new Date().getHours() -3}:${new Date().getMinutes() < 10 ? "0"+new Date().getMinutes() : new Date().getMinutes()}`))
});
shard.spawn();