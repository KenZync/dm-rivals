import { Grade } from "./enum";
import { Database } from "./supabase";

declare global {
  export type Tables<T extends keyof Database["public"]["Tables"]> =
    Database["public"]["Tables"][T]["Row"];

  export type Song = {
    ID: string;
    Title: string;
    Artist: string;
    NoteCharter: string;
    Level: string;
    BPM: string;
  };

  export type Score = {
    user_id: number;
    song_id: number;
    rank: number;
    cool: number;
    good: number;
    bad: number;
    miss: number;
    max_combo: number;
    acc: number;
    progress: any;
    clear: boolean;
    play_time: any;
  };

  export type SongData = {
    id: number;
    title: string;
    artist: string;
    note_charter: string;
    bpm: number;
  };

  export type musicData = {
    [id: number]: {
      id: number;
      title: string;
      artist: string;
      note_charter: string;
      level: number;
      bpm: number;
    };
  }[];

  export type GradeData = {
    count: number;
    songs: SongData[];
  };

  export type PlayerPerformance = {
    level: number;
    song_count: number;
    clear_count: number;
    fail_count: number;
    no_play_count: number;
    grades: {
      [grade in Grade]: GradeData;
    };
    clear_songs: SongData[];
    fail_songs: SongData[];
    no_play_songs: SongData[];
  };

  export type ScrapedScore = {
    ID: number;
    Title: string;
    Acc: string;
    Progress: string;
    Clear: string;
    Rank: string;
    Level: number;
    PlayTime: string;
  };

  export type PlayerPerformancesByLevel = {
    [level: number]: PlayerPerformance;
  };

  export type DetailSongScore = {
    metadata: {
      level: string;
      song: string;
      artist: string;
      charter: string;
      bpm: string;
      playcount: string;
    };
    players: {
      UserID: string;
      Name: string;
      Rank: string;
      Cool: string;
      Good: string;
      Bad: string;
      Miss: string;
      MaxCombo: string;
      Acc: string;
      Progress: string;
      Clear: string;
      PlayTime: string;
    }[];
  };
}

