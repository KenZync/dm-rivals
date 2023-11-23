import type { PlayerScore } from "~/types/dmjam";

export const getSongDetail = async (id: number) => {
  const data: PlayerScore[] = await $fetch(
    `https://dmjam.net/api/scoreboard/chart/${id}?gauge_difficulty=2`
  );

  let players: DetailSongScore = {
    metadata: {
      level: "",
      song: "",
      artist: "",
      charter: "",
      bpm: "",
      playcount: "",
    },
    players: [],
  };

  data.forEach((score) => {
    const oneScore = {
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
    players.players.push(oneScore);
  });
  return players;
};
