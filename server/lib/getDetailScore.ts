import type { PlayerScore } from "~/types/dmjam";

export const getDetailScore = async (userID: number, songID: string) => {
  const data: PlayerScore[] = await $fetch(
    `https://dmjam.net/api/scoreboard/chart/${songID}?gauge_difficulty=2`
  );

  let userScore: PlayerScoreDetail = {
    UserID: 0,
    Name: "",
    Rank: 0,
    Cool: 0,
    Good: 0,
    Bad: 0,
    Miss: 0,
    MaxCombo: 0,
    Acc: 0,
    Progress: "",
    Clear: "",
    PlayTime: new Date(),
  };

  data.forEach((score) => {
    if (score.player_code == userID) {
      userScore = {
        UserID: score.player_code,
        Name: score.player_nickname,
        Rank: score.row_number,
        Cool: score.score_cool,
        Good: score.score_good,
        Bad: score.score_bad,
        Miss: score.score_miss,
        MaxCombo: score.score_max_combo,
        Acc: score.score,
        Progress: score.progress + " Rank",
        Clear: score.is_cleared_record ? "Cleared" : "Failed",
        PlayTime: score.cleared_time,
      };
      return false;
    }
  });

  return userScore;
};
