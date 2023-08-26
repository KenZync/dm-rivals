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

  // Fetch existing music records from the table
  const { data: existingMusics, error: fetchError } = await client.from("musics").select();

  if (fetchError) {
    throw createError({ statusMessage: fetchError.message });
  }

  if (existingMusics !== null) {
    // Identify IDs of songs to be removed
    const songIdsToRemove = existingMusics
      .filter(existingMusic => !convertedMusics.some(convertedMusic => convertedMusic.id === existingMusic.id))
      .map(song => song.id);

    // Delete songs that need to be removed
    if (songIdsToRemove.length > 0) {
      const { error: deleteError } = await client.from("musics").delete().in("id", songIdsToRemove);
      if (deleteError) {
        throw createError({ statusMessage: deleteError.message });
      }
    }
  }

  // Upsert the new/updated music records
  const { data, error } = await client.from("musics").upsert(convertedMusics).select();

  if (error) {
    throw createError({ statusMessage: error.message });
  }
  return data;
});
