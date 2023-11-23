import { getSongDetail } from "~/server/lib/getSongDetail";
import type { Database } from "~/types/supabase";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const level = getRouterParam(event, "level");

  const { data: musics, error: musicsError } = await client
    .from("musics")
    .select("id")
    .eq("level", level || 0);
  if (musicsError) {
    throw createError({ statusMessage: musicsError.message });
  }

  const musicIds = musics.map((music: { id: number; }) => music.id);
  const musicDetails = await fetchMusicDetailsSequentially(musicIds);

  const convertedDetails = musicDetails.map(async (detail, musicIndex) => {
    const convertedScores = detail.players.map((score) => {
      return {
        user_id: score.UserID,
        song_id: musicIds[musicIndex], // Assuming each detail has an 'id' property representing the song ID
        rank: score.Rank,
        cool: score.Cool,
        good: score.Good,
        bad: score.Bad,
        miss: score.Miss,
        max_combo: score.MaxCombo,
        acc: score.Acc,
        progress: score.Progress.slice(0, -5),
        clear: score.Clear === "Cleared" ? true : false,
        play_time: score.PlayTime,
      };
    });

    const uniqueConvertedScores: any[] = [];
    const seenCombinations = new Set();

    convertedScores.forEach((score) => {
      const combination = `${score.user_id}_${score.song_id}`;
      if (!seenCombinations.has(combination)) {
        seenCombinations.add(combination);
        uniqueConvertedScores.push(score);
      }
    });

    const { data: updateScores, error: updateScoresError } = await client
      .from("scores")
      .upsert(uniqueConvertedScores, { onConflict: "song_id,user_id" })
      .select();

    return;
  });

  return "Level " + level + " Updated";
});

async function fetchMusicDetailsSequentially(musicIds: number[]) {
  const musicDetails = [];

  for (const id of musicIds) {
    const songDetail = await getSongDetail(id);
    musicDetails.push(songDetail);
  }

  return musicDetails;
}
