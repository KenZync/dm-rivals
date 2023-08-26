import { getSongDetail } from "~/server/lib/getSongDetail";
import { Database } from "~/types/supabase";
import { serverSupabaseClient } from "#supabase/server";

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
      user_id: parseInt(score.UserID),
      song_id: musics[now].id,
      rank: parseInt(score.Rank.slice(1)),
      cool: parseInt(score.Cool),
      good: parseInt(score.Good),
      bad: parseInt(score.Bad),
      miss: parseInt(score.Miss),
      max_combo: parseInt(score.MaxCombo),
      acc: parseFloat(score.Acc),
      progress: score.Progress.slice(0, -5),
      clear: score.Clear === "Cleared" ? true : false,
      play_time: score.PlayTime,
    };
  });

  const { data: updateScores, error: updateScoresError } = await client
    .from("scores")
    .upsert(convertedScores,{onConflict:'song_id,user_id'})
    .select();
  if (updateScoresError) {
    throw createError({ statusMessage: updateScoresError.message });
  }

  // const convertedMusics = songLists.map((song) => {
  //   return {
  //     title: song.Title,
  //     artist: song.Artist,
  //     bpm: parseFloat(song.BPM),
  //     id: parseInt(song.ID),
  //     level: parseInt(song.Level),
  //     note_charter: song.NoteCharter,
  //     updated_at: new Date().toISOString(),
  //   };
  // });

  // const { data, error } = await client
  //   .from("musics")
  //   .upsert(convertedMusics)
  //   .select();

  // if (error) {
  //   throw createError({ statusMessage: error.message });
  // }

  const { data: updateVariable, error: updateVariableError } = await client
    .from("variable")
    .upsert({ id: 1, update_index: next });
  if (updateVariableError) {
    throw createError({ statusMessage: updateVariableError.message });
  }

  return musics[variable.update_index].id + " updated";
});
