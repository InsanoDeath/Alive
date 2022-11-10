const discord = require("discord.js");
const { prefix, colors } = require("./../../config.json");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Shows all commands of the bot",
  category: "uptime",
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  run: async (client, message, args) => {
    let how_to = "https://github.com/InsanoDeath3/Alive/blob/main/README.md";
    let embed = new discord.MessageEmbed()
      .setTitle("▶️ Here are my comamnds!")
      .setColor(colors.bot)
      .setFooter(`Prefix: "${prefix}"`)
      .setThumbnail(client.user.displayAvatarURL())
      .addField("How to use?", "[Click here](" + how_to + ") to read how to make your project online 24/7.")
      .setTimestamp();

    var commands = client.commands
      .filter((c) => c.ownerOnly === false)
      .map((cmd) => `${prefix}${cmd.name} - ${cmd.description}`);
    embed.setDescription(`\`\`\`${commands.sort().join("\n")}\`\`\``);

    message.channel.send(embed);
  },
};
