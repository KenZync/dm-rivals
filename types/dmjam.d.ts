import { Progress, Tier } from "./enum";

interface PlayerLists {
  current_option_name: string;
  player_infos: PlayerInfo[];
}

interface PlayerInfo {
  player_code: number;
  player_nickname: null | string;
  rank: number;
  row_number: number;
  tier: Tier;
}

interface MusicLists {
  artist: string;
  bpm: number;
  hard_level: number;
  music_code: number;
  note_charter: string;
  title: string;
}

interface PlayerScore {
  cleared_time: Date;
  is_cleared_record: boolean;
  player_code: number;
  player_nickname: string;
  progress: Progress;
  row_number: number;
  score: number;
  score_bad: number;
  score_cool: number;
  score_good: number;
  score_max_combo: number;
  score_miss: number;
}

interface PlayerScoreProfile {
  player_code: number;
  music_code: number;
  music_title: string;
  music_difficulty: number;
  music_level: number;
  score: number;
  progress: string;
  is_cleared_record: boolean;
  cleared_time: Date;
  record_rank: number;
  row_number: number;
}

interface PlayerProfile {
  admin_level: number;
  cleared_charts_count: number;
  current_view_difficulty: number;
  last_access_time: string;
  level: number;
  nickname: string;
  play_count: number;
  player_code: number;
  player_ranking: number;
  tie_player_count: number;
}
