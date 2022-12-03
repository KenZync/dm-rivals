import * as cheerio from "cheerio";

export const getID = (ranking, reqName) => {
  const $ = cheerio.load(ranking);
  const sel = "div.table-responsive-lg > table > tbody > tr";
  let finalID = 0;
  $(sel).each(function () {
    $(this)
      .find("a")
      .each(function (i, name) {
        if (decodeURIComponent(reqName) == $(name).text()) {
          const id = $(name).attr("href").match(/\d+/)[0];
          finalID = id;
          return;
        }
      });
  });
  if (finalID != 0) {
    return finalID;
  }
};
