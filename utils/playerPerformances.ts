import { Grade } from "~/types/enum";

export type PlayerMusic = SongData & { level: number };

export type PlayerScoreRecord = {
  music_code: number;
  music_level: number | null;
  progress: string;
  is_cleared_record: boolean;
};

export function buildPlayerPerformances(
  scores: PlayerScoreRecord[],
  musics: PlayerMusic[]
): PlayerPerformancesByLevel {
  const performances: PlayerPerformancesByLevel = {};
  const musicById = new Map<number, PlayerMusic>();

  for (const music of musics) {
    musicById.set(music.id, music);
    const level = (performances[music.level] ??= {
      level: music.level,
      song_count: 0,
      clear_count: 0,
      fail_count: 0,
      no_play_count: 0,
      grades: {
        [Grade.P]: { count: 0, songs: [] },
        [Grade.SS]: { count: 0, songs: [] },
        [Grade.S]: { count: 0, songs: [] },
        [Grade.A]: { count: 0, songs: [] },
        [Grade.B]: { count: 0, songs: [] },
        [Grade.C]: { count: 0, songs: [] },
        [Grade.D]: { count: 0, songs: [] },
        [Grade.F]: { count: 0, songs: [] },
      },
      clear_songs: [],
      fail_songs: [],
      no_play_songs: [],
    });

    level.song_count++;
    level.no_play_count++;
    level.no_play_songs.push(music);
  }

  const seenScores = new Set<number>();
  for (const score of scores) {
    const music = musicById.get(score.music_code);
    if (!music || score.music_level === null || seenScores.has(music.id)) continue;
    seenScores.add(music.id);

    const level = performances[music.level];
    const grade = Grade[score.progress as keyof typeof Grade] ?? Grade.F;
    level.no_play_count--;
    level.no_play_songs = level.no_play_songs.filter(
      (song) => song.id !== music.id
    );

    if (score.is_cleared_record) {
      level.clear_count++;
      level.clear_songs.push(music);
    } else {
      level.fail_count++;
      level.fail_songs.push(music);
    }
    level.grades[grade].count++;
    level.grades[grade].songs.push(music);
  }

  return performances;
}
