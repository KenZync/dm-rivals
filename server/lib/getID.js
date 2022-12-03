import fs from "fs";
import * as cheerio from "cheerio";

export const getID = (reqName) => {
  
  const ranking = fs.readFileSync("data/ranking.html", { encoding: "utf8" });
  const $ = cheerio.load(ranking);
  const sel = "div.table-responsive-lg > table > tbody > tr";
  let finalID = 0;
  $(sel).each(function () {
    $(this)
      .find("a")
      .each(function (i, name) {
        if (reqName == $(name).text()) {
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