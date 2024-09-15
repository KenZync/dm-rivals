import type { PlayerScoreProfile } from "~/types/dmjam";
import type { NSPlayerScore } from "~/types/nsjam";

export const getNSScore = async (player: string) => {
  const runtimeConfig = useRuntimeConfig();
  const data: NSPlayerScore[] = await $fetch(
    `${runtimeConfig.nsjamApiBase}/api/members/${player}`
  );

  const scores: {
    ID: number;
    Title: string;
    Progress: string;
    Clear: string;
    Level: number;
  }[] = [];

  data.forEach((score) => {
    if (score.song_id == null) return;
    scores.push({
      ID: score.song_id,
      Title: score.TITLE,
      Progress: score.rating,
      Clear: score.result,
      Level: score.song_level,
    });
  });
  return scores;
};
