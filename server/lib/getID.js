import * as cheerio from "cheerio";

export const getID = (ranking, reqName) => {
  const $ = cheerio.load(ranking);
  const sel = "table > tbody > tr";
  let finalID = 0;
  $(sel)
    .find("a")
    .each(function (i, name) {
      if (decodeURIComponent(reqName).toLowerCase() == $(name).text().toLowerCase()) {
        const id = $(name).attr("href").split("/").pop();
        finalID = id;
        return false;
      }
    });
  if (finalID != 0) {
    return finalID;
  }
};

// Upper Code is ChatGPT My Original Code
// $(sel).each(function () {
//   $(this)
//     .find("a")
//     .each(function (i, name) {
//       if (decodeURIComponent(reqName) == $(name).text()) {
//         const id = $(name).attr("href").match(/\d+/)[0];
//         finalID = id;
//         return false;
//       }
//     });
// });
