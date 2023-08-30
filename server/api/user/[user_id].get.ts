import { Database } from "~/types/supabase";
import { getScoreV2 } from "~/server/lib/getScoreV2";
import { serverSupabaseClient } from "#supabase/server";
import { Grade } from "~/types/enum";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const user_id = getRouterParam(event, "user_id");
  const scrapedScores: ScrapedScore[] = await getScoreV2(user_id);

  const { data: musics } = await client
    .from("musics")
    .select("id,title,artist,note_charter,level,bpm")
    .order("id", { ascending: false });



  const musicMap: { [id: number]: SongData } = {};
  // if (musics !== null) {
  //   musics.forEach(music => {
  //         musicMap[music.id] = music;
  //     });
  // }
  

  const playerPerformancesByLevel: PlayerPerformancesByLevel = {};
  if (musics) {
    for (const music of musics) {
      musicMap[music.id] = music;
      if (!playerPerformancesByLevel[music.level]) {
        playerPerformancesByLevel[music.level] = {
          level: music.level,
          song_count: 0,
          clear_count: 0,
          fail_count: 0,
          no_play_count: 0,
          grades: {
            [Grade.P]: {
              count: 0,
              songs: [],
            },
            [Grade.SS]: {
              count: 0,
              songs: [],
            },
            [Grade.S]: {
              count: 0,
              songs: [],
            },
            [Grade.A]: {
              count: 0,
              songs: [],
            },
            [Grade.B]: {
              count: 0,
              songs: [],
            },
            [Grade.C]: {
              count: 0,
              songs: [],
            },
            [Grade.D]: {
              count: 0,
              songs: [],
            },
            [Grade.F]: {
              count: 0,
              songs: [],
            },
          },
          clear_songs: [],
          fail_songs: [],
          no_play_songs: [],
        };
      }
      playerPerformancesByLevel[music.level].song_count++;
      playerPerformancesByLevel[music.level].no_play_count++;
      playerPerformancesByLevel[music.level].no_play_songs.push({
        id: music.id,
        title: music.title,
        artist: music.artist,
        note_charter: music.note_charter,
        bpm: music.bpm
      });
    }
  }

  scrapedScores.forEach((score) => {
    const gradeMatch = score.Clear.match(/([A-Z]+)\sRank/);
    const grade = gradeMatch
      ? Grade[gradeMatch[1] as keyof typeof Grade]
      : Grade.F;
    if (score.Level > 0) {
      if (score.Progress === "Cleared") {
        playerPerformancesByLevel[score.Level].clear_count++;
        playerPerformancesByLevel[score.Level].no_play_count--;

        // Remove the cleared song from no_play_songs
        playerPerformancesByLevel[score.Level].no_play_songs =
          playerPerformancesByLevel[score.Level].no_play_songs.filter(
            (song) => song.id !== score.ID
          );

        playerPerformancesByLevel[score.Level].clear_songs.push({
          id: score.ID,
          title: score.Title,
          artist: musicMap[score.ID].artist,
          note_charter: musicMap[score.ID].note_charter,
          bpm: musicMap[score.ID].bpm
        });
      } else if (score.Progress === "Failed") {
        playerPerformancesByLevel[score.Level].fail_count++;
        playerPerformancesByLevel[score.Level].no_play_count--;

        // Remove the failed song from no_play_songs
        playerPerformancesByLevel[score.Level].no_play_songs =
          playerPerformancesByLevel[score.Level].no_play_songs.filter(
            (song) => song.id !== score.ID
          );

        playerPerformancesByLevel[score.Level].fail_songs.push({
          id: score.ID,
          title: score.Title,
          artist: musicMap[score.ID].artist,
          note_charter: musicMap[score.ID].note_charter,
          bpm: musicMap[score.ID].bpm
        });
      }
      playerPerformancesByLevel[score.Level].grades[grade].count++;
      playerPerformancesByLevel[score.Level].grades[grade].songs.push({
        id: score.ID,
        title: score.Title,
        artist: musicMap[score.ID].artist,
        note_charter: musicMap[score.ID].note_charter,
        bpm: musicMap[score.ID].bpm
      });
    }
  });
  return playerPerformancesByLevel;
});
