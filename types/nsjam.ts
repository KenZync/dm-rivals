export interface NSPlayerScore {
  TITLE: string;
  difficulty: number;
  rating: NSGrade;
  result: string;
  song_id: number;
  song_level: number;
}

export type NSPlayerPerformancesByLevel = {
  [level: number]: NSPlayerPerformance;
};

export type NSPlayerPerformance = {
  level: number;
  song_count: number;
  clear_count: number;
  fail_count: number;
  no_play_count: number;
  grades: {
    [grade in NSGrade]: GradeData;
  };
  clear_songs: SongData[];
  fail_songs: SongData[];
  no_play_songs: SongData[];
};

export type NSScrapedScore = {
  Title: string;
  ID: number;
  Progress: string;
  Clear: string;
  Level: number;
};

export enum NSGrade {
  SS = "SS",
  S = "S",
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  F = "F",
}

export type NSMusic = {
  id: number;
  title: string;
  artist: string;
  level: number;
  bpm: number;
  note_charter: string;
};
