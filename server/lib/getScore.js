import * as cheerio from "cheerio";

export const getScore = async (id) => {
  const url = "https://dpjam.net/player-scoreboard/" + id + "/2";
  const data = await $fetch(url);
  const $ = cheerio.load(data);
  const musics = [];
  const sel = "div.table-responsive-lg > table > tbody > tr";
  const keys = [
    "Rank",
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
        musicDetails[keys[keyIndex]] = $(link).attr("href").match(/\d+/)[0];
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
