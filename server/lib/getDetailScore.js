import * as cheerio from "cheerio";

export const getDetailScore = async (userID, songID) => {
  const url = "https://dmjam.net/music-scoreboard/" + songID;
  const data = await $fetch(url);
  const $ = cheerio.load(data);
  let score;
  const sel = "table > tbody > tr";

  $(sel).each((index, element) => {
    const tds = $(element).find("td");
    const th = $(element).find("th");
    const rank = $(th[0]).text().trim();
    const user = $(tds[0]).find("a").attr("href").match(/\d+/)[0];
    const nickname = $(tds[0]).text().trim();
    const cool = $(tds[1]).text().trim();
    const good = $(tds[2]).text().trim();
    const bad = $(tds[3]).text().trim();
    const miss = $(tds[4]).text().trim();
    const maxCombo = $(tds[5]).text().trim();
    const acc = $(tds[6]).text().trim();
    const progress = $(tds[7]).text().trim();
    const clear = $(tds[8]).text().trim();
    const playTime = $(tds[9]).text().trim();

    if (user == userID) {
      score = {
        Name: nickname,
        Rank: rank,
        Cool: cool,
        Good: good,
        Bad: bad,
        Miss: miss,
        MaxCombo: maxCombo,
        Acc: acc,
        Progress: progress,
        Clear: clear,
        PlayTime: playTime,
      };
      return false
    }
  });

  return score;
};
