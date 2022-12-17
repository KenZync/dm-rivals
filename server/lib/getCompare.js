export const getCompare = async (scoreSet1, scoreSet2, id1, id2, songLists) => {
  let data = {};
  if (id1 && id2) {
    let win1 = compareScores(scoreSet1, scoreSet2, songLists);
    let win2 = compareScores(scoreSet2, scoreSet1, songLists);

    if (songLists) {
      win1 = addAllSongs(win1, songLists);
      win2 = addAllSongs(win2, songLists);
    }
    data = { win1, win2, id1, id2 };
  } else if (id1) {
    if (songLists) {
      const result = addAllSongs(scoreSet1, songLists);
      data = { win1: result, id1 };
    } else {
      data = { win1: scoreSet1, id1 };
    }
  } else if (id2) {
    if (songLists) {
      const result = addAllSongs(scoreSet2, songLists);
      data = { win2: result, id2 };
    } else {
      data = { win2: scoreSet2, id2 };
    }
  }
  return data;
};

function compareScores(scoreSet1, scoreSet2,songLists) {
  let win = [];

  scoreSet1.forEach((score1) => {
    let found = false;
    scoreSet2.forEach((score2) => {
      if (score1.ID === score2.ID) {
        found = true;
        if (parseInt(score1.Rank) < parseInt(score2.Rank)) {
          if(songLists){
            score1.Win = true
          }else{
            score1.Rank = score1.Rank + "|" + score2.Rank;
            score1.AccRival = score2.Acc;
            score1.PlayTime2 = score2.PlayTime;
          }
          win.push(score1);
        }
      }
    });
    if (!found) {
      win.push(score1);
    }
  });

  // Chat GPT WRONG
  // // Create a hash map of the scores in scoreSet2
  // const scores2Map = new Map();
  // scoreSet2.forEach((score2) => {
  //   scores2Map.set(score2.ID, score2);
  // });

  // // Iterate through the scores in scoreSet1 and compare them to the scores in scoreSet2
  // scoreSet1.forEach((score1) => {
  //   const score2 = scores2Map.get(score1.ID);
  //   if (score2 && parseInt(score1.Rank) < parseInt(score2.Rank)) {
  //     if(songLists){
  //       score1.Win = true
  //     }else{
  //       score1.Rank = score1.Rank + "|" + score2.Rank;
  //       score1.AccRival = score2.Acc;
  //       score1.PlayTime2 = score2.PlayTime;
  //     }
  //     win.push(score1);
  //   } else {
  //     win.push(score1);
  //   }
  // });
  return win;
}

function addAllSongs(scoreSet, songLists) {
  const result = songLists.map((music) => {
    const score = scoreSet.find((s) => s.ID === music.ID);
    return score
      ? score
      : {
          ID: music.ID,
          Title: music.Title,
          Acc: "-",
          Progress: "-",
          Clear: "-----",
          Rank: "-",
          Level: music.Level,
          PlayTime: 0,
        };
  });
  return result;
}

//My Code

// scoreSet1.forEach((score1) => {
//   let found = false;
//   scoreSet2.forEach((score2) => {
//     if (score1.ID === score2.ID) {
//       found = true;
//       if (parseInt(score1.Rank) < parseInt(score2.Rank)) {
//         score1.Rank = score1.Rank + "|" + score2.Rank;
//         score1.AccRival = score2.Acc
//         score1.PlayTime2 = score2.PlayTime
//         win1.push(score1);
//       }
//     }
//   });
//   if (!found) {
//     win1.push(score1);
//   }
// });

// scoreSet2.forEach((score2) => {
//   let found = false;
//   scoreSet1.forEach((score1) => {
//     if (score1.ID === score2.ID) {
//       found = true;
//       if (parseInt(score2.Rank) < parseInt(score1.Rank)) {
//         score2.Rank = score2.Rank + "|" + score1.Rank;
//         score2.AccRival = score1.Acc
//         score2.PlayTime2 = score1.PlayTime;
//         win2.push(score2);
//       }
//     }
//   });
//   if (!found) {
//     win2.push(score2);
//   }
// });
