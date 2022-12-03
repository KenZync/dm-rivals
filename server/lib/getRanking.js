import fs from "fs";
export const getRanking = async () => {
  const data = await $fetch(`https://dpjam.net/ranking`);
  fs.writeFileSync("data/ranking.html", data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  return data;
};
