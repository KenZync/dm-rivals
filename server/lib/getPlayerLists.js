import * as cheerio from "cheerio";

export const getPlayerLists = async () => {
  const data = await $fetch(`https://dmjam.net/ranking`);

  const $ = cheerio.load(data);
  const players = [];
  const sel = "table > tbody > tr";
  const keys = [
    "ID",
    "Nickname",
    "Tier",
    "Clear",
  ];
  $(sel).each(function () {
    let keyIndex = 0;
    const playerDetails = {};
    $(this)
      .find("a")
      .each(function (i, link) {
        playerDetails[keys[keyIndex]] = $(link).attr("href").match(/\d+/)[0];
        keyIndex++;
      });

    $(this)
      .find("td")
      .each(function () {
        playerDetails[keys[keyIndex]] = $(this).text().trim();
        keyIndex++;
      });
    players.push(playerDetails);
  });
  return players;
};
