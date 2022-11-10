const discord = require("discord.js");
const fetch = require("node-fetch");
const UrlsConfig = require("./database/models/UrlsConfig");
const fetchProjects = require("./fetchProjects");
const { timeout } = require("./config.json");
const config = require("./config.json")

const client = new discord.Client({
  disableEveryone: true,
});

(async () => {
  await require("./database/connect");
  let pros = await UrlsConfig.find();
  let tempPros = await pros.map((p) => p.projectURL);

  client.commands = new discord.Collection();
  client.projects = tempPros;
  client.aliases = new discord.Collection();

  ["command", "events"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
  });

  await client.login(config.token);

  fetchProjects(client.projects);
})();

// pinging
setInterval(async () => {
  client.user.setActivity(`${client.projects.length} Project(s)`, {
    type: "WATCHING",
  });

  fetchProjects(client.projects);
}, timeout);
