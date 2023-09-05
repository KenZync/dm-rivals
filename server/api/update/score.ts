import { getSongDetail } from "~/server/lib/getSongDetail";
import { Database } from "~/types/supabase";
import { serverSupabaseClient } from "#supabase/server";
import { getPlayerLists } from "~/server/lib/getPlayerLists";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const { data: variable, error: variableError } = await client
    .from("variable")
    .select("*")
    .single();
  if (variableError) {
    throw createError({ statusMessage: variableError.message });
  }

  const { data: musics, error: musicsError } = await client
    .from("musics")
    .select("id");
  if (musicsError) {
    throw createError({ statusMessage: musicsError.message });
  }

  let now = variable.update_index;
  let next = now + 1;
  let last = musics.length - 1;

  if (next > last) {
    next = 0;
  }

  const detail = await getSongDetail(musics[now].id);

  const convertedScores = detail.players.map((score) => {
    return {
      user_id: score.UserID,
      song_id: musics[now].id,
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

  const uniqueConvertedScores: Score[] = [];
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
  if (updateScoresError) {
    // TODO: Please make into function soon
    const ranking = await getPlayerLists();
  
    const players = ranking.map((player) => {
      return {
        user_id: player.ID,
        nickname: player.Nickname,
        tier: player.Tier,
        clear: player.Clear,
      };
    });
  
    const { data, error: playersError } = await client
      .from("users")
      .upsert(players).select();
  
    if (playersError) {
      throw createError({ statusMessage: playersError.message });
    }
    throw createError({ statusMessage: updateScoresError.message });

  }

  const { data: updateVariable, error: updateVariableError } = await client
    .from("variable")
    .upsert({ id: 1, update_index: next });
  if (updateVariableError) {
    throw createError({ statusMessage: updateVariableError.message });
  }

  return {data: "id:" + musics[variable.update_index].id + " updated " + variable.update_index + "/"+ last};
});
