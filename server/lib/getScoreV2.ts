import { PlayerScoreProfile } from "~/types/dmjam";

export const getScoreV2 = async (id: string) => {
  const data: PlayerScoreProfile[] = await $fetch(
    `https://dmjam.net/api/scoreboard/player/${id}?&gauge_difficulty=2`
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
      Acc: score.score + "%",
      Progress: score.progress + " Rank",
      Clear: score.is_cleared_record ? "Cleared" : "Failed",
      Rank: score.record_rank,
      Level: score.music_level,
      PlayTime: score.cleared_time,
    });
  });
  return scores;
};
