import { getNSScore } from "~/server/lib/nsjam/getNSScore";
import {
  NSGrade,
  type NSMusic,
  type NSPlayerPerformancesByLevel,
  type NSScrapedScore,
} from "~/types/nsjam";
import { getNSMusicList } from "~/server/lib/nsjam/getNSMusicList";

export default defineEventHandler(async (event) => {
  const player = getRouterParam(event, "player");

  const scrapedScores: NSScrapedScore[] = await getNSScore(player || "");
  const musics: NSMusic[] = await getNSMusicList(player || "");

  const musicMap: { [id: number]: SongData } = {};

  const playerPerformancesByLevel: NSPlayerPerformancesByLevel = {};
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
            [NSGrade.SS]: {
              count: 0,
              songs: [],
            },
            [NSGrade.S]: {
              count: 0,
              songs: [],
            },
            [NSGrade.A]: {
              count: 0,
              songs: [],
            },
            [NSGrade.B]: {
              count: 0,
              songs: [],
            },
            [NSGrade.C]: {
              count: 0,
              songs: [],
            },
            [NSGrade.D]: {
              count: 0,
              songs: [],
            },
            [NSGrade.F]: {
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
        bpm: music.bpm,
      });
    }
  }

  scrapedScores.forEach((score) => {
    const gradeMatch = score.Progress.match(/([A-F]+|SS)/);
    const grade = gradeMatch
      ? NSGrade[gradeMatch[1] as keyof typeof NSGrade]
      : NSGrade.F;
    if (score.Level > 0) {
      if (score.Clear === "Cleared") {
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
          bpm: musicMap[score.ID].bpm,
        });
      } else if (score.Clear === "Failed") {
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
          bpm: musicMap[score.ID].bpm,
        });
      }
      playerPerformancesByLevel[score.Level].grades[grade].count++;
      playerPerformancesByLevel[score.Level].grades[grade].songs.push({
        id: score.ID,
        title: score.Title,
        artist: musicMap[score.ID].artist,
        note_charter: musicMap[score.ID].note_charter,
        bpm: musicMap[score.ID].bpm,
      });
    }
  });
  return playerPerformancesByLevel;

  return scrapedScores;
});
