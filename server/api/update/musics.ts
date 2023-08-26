import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/supabase";
import { getSongLists } from "~/server/lib/getSongLists";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const songLists: Song[] = await getSongLists();
  
  const convertedMusics = songLists.map((song) => {
    return {
      title: song.Title,
      artist: song.Artist,
      bpm: parseFloat(song.BPM),
      id: parseInt(song.ID),
      level: parseInt(song.Level),
      note_charter: song.NoteCharter,
      updated_at: new Date().toISOString(),
    };
  });

  const { data, error } = await client
    .from("musics")
    .upsert(convertedMusics)
    .select();

  if (error) {
    throw createError({ statusMessage: error.message });
  }
  return data;
});
