import * as cheerio from "cheerio";

export const getPlayerData = (ranking, reqName) => {
    const $ = cheerio.load(ranking);
    const sel = "table > tbody > tr";
    let playerData = [];
    $(sel).each(function (i, row) {
      const player = {
        id: $(row).find("a").attr("href").split("/").pop(),
        name: $(row).find("a").text(),
        rank: $(row).find("td:nth-child(3)").text(),
        level: $(row).find("td:nth-child(4)").text(),
      };
      playerData.push(player);
    });
    const reqPlayerData = playerData.find((player) =>
      decodeURIComponent(reqName).toLowerCase() === player.name.toLowerCase()
    );
    return reqPlayerData;
  };