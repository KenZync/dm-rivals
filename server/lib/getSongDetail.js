import * as cheerio from "cheerio";

export const getSongDetail = async (id) => {
  const url = "https://dmjam.net/music-scoreboard/" + id;
  const fetchData = await $fetch(url);
  const $ = cheerio.load(fetchData);
  const players = [];
  const level = $("a.btn.btn-danger").text().match(/\d+/)[0];
  const song = $("h1").text();
  const artist = $("h4").eq(0).text();
  const charter = $("h4").eq(1).text();
  const bpm = $("div > span:first-of-type").text().match(/\d+/)[0];
  const playcount = $("div > span:last-of-type").text().match(/\d+/)[0];


  const metadata = {
    level: level,
    song: song,
    artist: artist,
    charter: charter,
    bpm: bpm,
    playcount: playcount,
  };

  const sel = "table > tbody > tr";

//   Name: nickname,
//   Rank: rank,
//   Cool: cool,
//   Good: good,
//   Bad: bad,
//   Miss: miss,
//   MaxCombo: maxCombo,
//   Acc: acc,
//   Progress: progress,
//   Clear: clear,
//   PlayTime: playTime,

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

    const score = {
    UserID: user,
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
    players.push(score)
  });

  const data = {metadata,players}

  return data
};
