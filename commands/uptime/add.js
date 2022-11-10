const UrlsConfig = require("./../../database/models/UrlsConfig");
const discord = require("discord.js");
const fetch = require("node-fetch");
const validUrl = require("valid-url");

module.exports = {
  name: "add",
  description: "Adds monitor to your project.",
  aliases: ["host"],
  category: "uptime",
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  run: async (client, message, args) => {
    message.delete();
    var url = args[0];

    // CHECKS THE URL IF PROVIDED OR WRONG
    if (!url) return message.reply("Please give a project url!");
    if (!validUrl.isUri(url)) {
      return message.channel.send("Please provide a vaild url!");
    }

    // LOADING
    let waitEmbed = new discord.MessageEmbed().setAuthor("Please wait...", "https://cdn.discordapp.com/emojis/756773010123522058.gif");
    var waiting = await message.channel.send(waitEmbed);

    // CHECKS IF THE PROJECT IS ALREADY REGISTERED
    var checkIfExsists = await UrlsConfig.findOne({
      projectURL: url,
    });

    if (checkIfExsists === null) {
      // RUNS WHEN PROJECT IS NOT REGISTERED
      await UrlsConfig.create({
        authorID: message.author.id,
        projectURL: url,
        pinged: 0,
      }).then(async () => {
        // RUNS AFTER THE PROJECT STORES THE DATA IN DATABASE
        try {
          // TRIES TO PING PROJECT
          await fetch(url);
        } catch (error) {
          // ERRORS HANDLING
          if (error.name === "FetchError") {
            // WHEN PROJECT IS UNREACHABLE
            message.channel.send("Fetching Error!");
          }
        }

        client.projects.push(url);

        // NOTIFIES WITH AN EMBED THAT PROJECT IS SUCCESSFULLY REGISTERED
        let embed = new discord.MessageEmbed()
          .setTitle("✅ Added Succesfully!")
          .setDescription("Thanks for using me")
          .setColor("#039799")
          .setTimestamp();
        await waiting.delete();
        await message.channel.send(embed);
      });
    } else {
      // RUNS WHEN THE PROJECT IS ALREADY IN DATABASE
      let embed = new discord.MessageEmbed()
        .setTitle("❌ Project is already Registered!")
        .setDescription("The project you're trying to register is already in the Database")
        .setColor("#FF0000")
        .setTimestamp();

      await waiting.delete();
      await message.reply(embed);
    }
  },
};
