export const getCompare = async (scoreSet1, scoreSet2) => {

  let win1 = [];
  let win2 = [];

  scoreSet1.forEach((score1) => {
    let found = false;
    scoreSet2.forEach((score2) => {
      if (score1.ID === score2.ID) {
        found = true;
        if (parseInt(score1.Rank) < parseInt(score2.Rank)) {
          score1.Rank = score1.Rank + "|" + score2.Rank;
          score1.Acc = score1.Acc + "|" + score2.Acc;
          score1.PlayTime2 = score2.PlayTime
          win1.push(score1);
        }
      }
    });
    if (!found) {
      win1.push(score1);
    }
  });

  scoreSet2.forEach((score2) => {
    let found = false;
    scoreSet1.forEach((score1) => {
      if (score1.ID === score2.ID) {
        found = true;
        if (parseInt(score2.Rank) < parseInt(score1.Rank)) {
          score2.Rank = score2.Rank + "|" + score1.Rank;
          score2.Acc = score2.Acc + "|" + score1.Acc;
          score2.PlayTime2 = score1.PlayTime;
          win2.push(score2);
        }
      }
    });
    if (!found) {
      win2.push(score2);
    }
  });

  const data = { win1 , win2 }

  return data;
};
