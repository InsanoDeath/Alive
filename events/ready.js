const UrlsConfig = require("./../database/models/UrlsConfig");

module.exports.run = async (client) => {
  console.log(`${client.user.tag} has logged in.`);
  var pros = await UrlsConfig.find();

  setInterval(() => {
    client.user.setActivity(`${pros.length} Project(s)`, {
      type: "WATCHING",
    });
  }, 1000 * 60);
};
