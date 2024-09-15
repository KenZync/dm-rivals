import { Grade } from "./enum";
import type { Database } from "./supabase";

declare global {
  export type Tables<T extends keyof Database["public"]["Tables"]> =
    Database["public"]["Tables"][T]["Row"];

  export type Song = {
    ID: number;
    Title: string;
    Artist: string;
    NoteCharter: string;
    Level: number;
    BPM: number;
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
    Rank: number;
    Level: number;
    PlayTime: Date;
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
    players: PlayerScoreDetail[];
  };

  export type PlayerScoreDetail = {
    UserID: number;
    Name: string;
    Rank: number;
    Cool: number;
    Good: number;
    Bad: number;
    Miss: number;
    MaxCombo: number;
    Acc: number;
    Progress: string;
    Clear: string;
    PlayTime: Date;
  };
}
