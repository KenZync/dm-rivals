import fs from "fs";
export const getRanking = async () => {
  const data = await $fetch(`https://dpjam.net/ranking`);
  const dir = "./data"
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  fs.writeFileSync("data/ranking.html", data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  return;
};
