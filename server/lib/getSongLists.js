import * as cheerio from "cheerio";

export const getSongLists = async () => {
  const data = await $fetch(`https://dpjam.net/music?keyword=&option=0&level-min=&level-max=`);

  const $ = cheerio.load(data);
  const musics = [];
  const sel = "table > tbody > tr";
  const keys = [
    "ID",
    "Title",
    "Artist",
    "NoteCharter",
    "Level",
    "BPM",
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
