const UrlsConfig = require("./../../database/models/UrlsConfig");
const discord = require("discord.js");
// const fetch = require("node-fetch");
const validUrl = require("valid-url");
const config = require("../../config.json")

module.exports = {
  name: "remove",
  description: "Removes monitor from your project.",
  aliases: ["dehost"],
  category: "uptime",
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  run: async (client, message, args) => {
    message.delete();
    const { channel } = message;

    var url = args[0];

    // CHECKS IF URL IS PROVIDED OR WRONG
    if (!url) return message.reply("Please give a project url!");
    if (!validUrl.isUri(url)) {
      return message.channel.send("Please give a vaild url!");
    }

    // LOADING
    let waitEmbed = new discord.MessageEmbed().setAuthor("Please wait...", "https://cdn.discordapp.com/emojis/769935094285860894.gif");
    var waiting = await message.channel.send(waitEmbed);

    // CHECKS IF DATA EXSISTS
    var checkIfExsists = await UrlsConfig.findOne({
      projectURL: url,
      authorID: message.author.id,
    });

    // DATA HANDLING
    if (checkIfExsists === null) {
      // PROJECT IS NOT REGISTERED
      let embed = new discord.MessageEmbed()
        .setTitle("❌ Project is not Registered!")
        .setDescription("Add one using: `.add <url>`")
        .setColor("#FF0000")
        .setTimestamp();

      await waiting.delete();
      return message.channel.send(embed);
    } else {
      // PROJECT IS REGISTERED

      // REMOVES THE DATA FROM DATABASE
      var storeIt = await UrlsConfig.findOneAndDelete({
        projectURL: url,
      }).then(async () => {
        let new_pros = await client.projects.filter((p) => p !== url);

        client.projects = new_pros;

        // NOTIFIES WITH AN EMBED
        let embed = new discord.MessageEmbed()
          .setTitle("✅ Removed Succesfully!")
          .setDescription("Thanks for using me")
          .setColor(config.colors.bot)
          .setTimestamp();

        await waiting.delete();
        return channel.send(embed);
      });
    }
  },
};
