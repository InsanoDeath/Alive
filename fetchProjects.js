const fetch = require("node-fetch");
const UrlsConfig = require("./database/models/UrlsConfig");

/**
 * Fetch Projects
 * @param {array} projects
 */
module.exports = async (projects) => {
  projects.forEach(async (url) => {
    let pro = await UrlsConfig.findOne({
      projectURL: url,
    });

    let pinged = pro.get("pinged");

    fetch(url).catch(() => {
      return;
    });

    pinged++;

    await UrlsConfig.findOneAndUpdate(
      {
        projectURL: url,
      },
      { pinged },
      {
        new: true,
      }
    );
  });
};
