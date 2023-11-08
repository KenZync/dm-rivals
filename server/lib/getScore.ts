import { PlayerScoreProfile } from "~/types/dmjam";

export const getScore = async (id: number) => {
  const data: PlayerScoreProfile[] = await $fetch(
    `https://dmjam.net/api/scoreboard/player/${id}?show-f-rank=&gauge_difficulty=2`
  );

  const scores: {
    ID: number;
    Title: string;
    Acc: string;
    Progress: string;
    Clear: string;
    Rank: number;
    Level: number;
    PlayTime: Date;
  }[] = [];

  data.forEach((score) => {
    if (score.music_level == null) return;
    scores.push({
      ID: score.music_code,
      Title: score.music_title,
      Acc: (score.score/ 10000).toFixed(2) + "%",
      Progress: score.progress + " Rank",
      Clear: score.is_cleared_record ? "Cleared" : "Failed",
      Rank: score.record_rank,
      Level: score.music_level,
      PlayTime: score.cleared_time,
    });
  });
  return scores;
};
