import { getID } from "../lib/getID";
import fs from "fs";

export const getCompare = async (firstName, secondName) => {
  const id1 = getID(decodeURIComponent(firstName));
  const id2 = getID(decodeURIComponent(secondName));

  let win1 = [];

  let rawScore1 = fs.readFileSync("data/" + id1 + ".json");
  let rawScore2 = fs.readFileSync("data/" + id2 + ".json");
  let scoreSet1 = JSON.parse(rawScore1);
  let scoreSet2 = JSON.parse(rawScore2);

  scoreSet1.forEach((score1) => {
    let found = false;
    scoreSet2.forEach((score2) => {
      if (score1.Title == score2.Title && score1.Level == score2.Level) {
        found = true;
        if (parseInt(score1.Rank) < parseInt(score2.Rank)) {
          score1.Rank = score1.Rank + "|" + score2.Rank;
          score1.Acc = score1.Acc + "|" + score2.Acc;
          win1.push(score1);
        }
      }
    });
    if (!found) {
      win1.push(score1);
    }
  });
  return win1;
};
