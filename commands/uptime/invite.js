const discord = require("discord.js");
const { invite_link } = require("./../../config.json");

module.exports = {
  name: "invite",
  description: "Invites the bot",
  category: "uptime",
  botPermission: [],
  authorPermission: [],
  ownerOnly: true,
  run: async (client, message, args) => {
    let girhub_repo = "https://github.com/InsanoDeath3/Alive/blob/main/README.md";
    let embed = new discord.MessageEmbed()
      .setTitle("Invite Me / Support.")
      .setColor("#a1eb34")
      .addField(
        "<:link:807875763415416853> **Invite Me**",
        "[Click here](" + invite_link + ") to invite me to into server."
      )
      .addField(
        "<:link:807875763415416853> **Get Code**",
        "[Click here](" + girhub_repo + ") to get Source Code."
      )
      .setTimestamp();

    return message.channel.send(embed);
  },
};
