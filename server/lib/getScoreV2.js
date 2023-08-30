import * as cheerio from "cheerio";

export const getScoreV2 = async (id) => {
  const url = "https://dmjam.net/player-scoreboard/" + id + "/2/Y";
  const data = await $fetch(url);
  const $ = cheerio.load(data);
  const musics = [];
  const sel = "table > tbody > tr";
  const keys = [
    "ID",
    "Title",
    "Acc",
    "Progress",
    "Clear",
    "Rank",
    "Level",
    "PlayTime",
  ];
  $(sel).each(function () {
    let keyIndex = 0;
    const musicDetails = {};
    $(this)
      .find("a")
      .each(function (i, link) {
        musicDetails[keys[keyIndex]] = parseInt($(link).attr("href").match(/\d+/)[0], 10);
        keyIndex++;
      });

    $(this)
      .find("td")
      .each(function () {
        musicDetails[keys[keyIndex]] = $(this).text().trim();
        keyIndex++;
      });
    musics.push(musicDetails);
  });
  return musics;
};