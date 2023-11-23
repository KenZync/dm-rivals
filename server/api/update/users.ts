import { serverSupabaseClient } from "#supabase/server";
import { getPlayerLists } from "~/server/lib/getPlayerLists";
import type { Database } from "~/types/supabase";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const ranking = await getPlayerLists();
  
  const players = ranking.map((player) => {
    return {
      user_id: player.ID,
      nickname: player.Nickname,
      tier: player.Tier,
      clear: player.Clear,
    };
  });

  const { data, error } = await client
    .from("users")
    .upsert(players).select();

  if (error) {
    throw createError({ statusMessage: error.message });
  }
  return data.length;
});
