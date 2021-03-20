const { table } = require('quick.db')
const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { owners } = require("../config.json")

module.exports = {
    name: "eval",
    aliases: ["ev", "e"],
    tag: "dev",
    onlyDev: true,
    run: async(client, message, args, lang) => {
        try {
      let resut = await eval(args.join(" "));
      let result = resut
      
      if (typeof result != "string") {
      resut=require('util').inspect(resut, { depth: 0})
      }
      
      if (resut instanceof Promise) {
          res.then(a => resut = a).catch(a => resut = null)
      }
      
      resut=resut.replace(/\/home\/runner\/node/g, "rapais");
      
      
      if (resut.toString().includes(client.token)) {
          const er = ""
          message.channel.send(`\`\`\`\n${er}\`\`\``)
          return;
      }
      message.channel.send(`${message.author} **|** Resultado:\`\`\`\n${resut}\`\`\``)
}catch(er){
   message.channel.send(`${message.author} **|** Ocorreu um erro :/\`\`\`\n${er.toString().replace(/\/home\/runner\/node/g, "rapais")}\`\`\``)
}
    }
}