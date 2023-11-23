import type { MusicLists } from "~/types/dmjam";

export const getSongLists = async () => {
  const data: MusicLists[] = await $fetch(`https://dmjam.net/api/charts`);

  const musics: {
    ID: number;
    Title: string;
    Artist: string;
    NoteCharter: string;
    Level: number;
    BPM: number;
  }[] = [];

  data.forEach((music) => {
    if (music.hard_level == null) return;
    musics.push({
      ID: music.music_code,
      Title: music.title,
      Artist: music.artist,
      NoteCharter: music.note_charter,
      Level: music.hard_level,
      BPM: music.bpm,
    });
  });
  return musics;
};
