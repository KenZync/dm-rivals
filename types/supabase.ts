export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      grade: {
        Row: {
          grade: string
          id: number
        }
        Insert: {
          grade?: string
          id?: number
        }
        Update: {
          grade?: string
          id?: number
        }
        Relationships: []
      }
      linking: {
        Row: {
          created_at: string | null
          dmjam_id: string
          dmjam_name: string | null
          id: number
          uuid: string
        }
        Insert: {
          created_at?: string | null
          dmjam_id: string
          dmjam_name?: string | null
          id?: number
          uuid: string
        }
        Update: {
          created_at?: string | null
          dmjam_id?: string
          dmjam_name?: string | null
          id?: number
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "linking_uuid_fkey"
            columns: ["uuid"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      musics: {
        Row: {
          artist: string
          bpm: number
          created_at: string
          id: number
          level: number
          note_charter: string
          title: string
          updated_at: string
        }
        Insert: {
          artist?: string
          bpm: number
          created_at?: string
          id?: number
          level: number
          note_charter: string
          title?: string
          updated_at: string
        }
        Update: {
          artist?: string
          bpm?: number
          created_at?: string
          id?: number
          level?: number
          note_charter?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      scores: {
        Row: {
          acc: number
          bad: number
          clear: boolean
          cool: number
          good: number
          id: number
          max_combo: number
          miss: number
          play_time: string
          progress: string
          rank: number
          song_id: number
          user_id: number
        }
        Insert: {
          acc: number
          bad: number
          clear: boolean
          cool: number
          good: number
          id?: number
          max_combo: number
          miss: number
          play_time: string
          progress: string
          rank: number
          song_id: number
          user_id: number
        }
        Update: {
          acc?: number
          bad?: number
          clear?: boolean
          cool?: number
          good?: number
          id?: number
          max_combo?: number
          miss?: number
          play_time?: string
          progress?: string
          rank?: number
          song_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "scores_progress_fkey"
            columns: ["progress"]
            referencedRelation: "grade"
            referencedColumns: ["grade"]
          },
          {
            foreignKeyName: "scores_song_id_fkey"
            columns: ["song_id"]
            referencedRelation: "musics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scores_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      users: {
        Row: {
          clear: number
          nickname: string
          tier: string
          user_id: number
        }
        Insert: {
          clear: number
          nickname: string
          tier: string
          user_id: number
        }
        Update: {
          clear?: number
          nickname?: string
          tier?: string
          user_id?: number
        }
        Relationships: []
      }
      variable: {
        Row: {
          id: number
          update_index: number
        }
        Insert: {
          id?: number
          update_index: number
        }
        Update: {
          id?: number
          update_index?: number
        }
        Relationships: []
      }
      vote: {
        Row: {
          comment: string | null
          dmjam_id: string
          id: number
          level: number | null
          song_id: string
          updated_at: string
        }
        Insert: {
          comment?: string | null
          dmjam_id: string
          id?: number
          level?: number | null
          song_id: string
          updated_at?: string
        }
        Update: {
          comment?: string | null
          dmjam_id?: string
          id?: number
          level?: number | null
          song_id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      song_play_count: {
        Row: {
          clears: number | null
          fails: number | null
          level: number | null
          played: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_user_scores_summary: {
        Args: {
          input_user_id: number
        }
        Returns: {
          level: number
          song_count: number
          clear_count: number
          fail_count: number
          no_play_count: number
          grade_p: number
          grade_ss: number
          grade_s: number
          grade_a: number
          grade_b: number
          grade_c: number
          grade_d: number
          grade_f: number
          clear_song_ids: number[]
          clear_song_titles: string[]
          fail_song_ids: number[]
          fail_song_titles: string[]
          no_play_song_ids: number[]
          no_play_song_titles: string[]
          grade_p_song_ids: number[]
          grade_p_song_titles: string[]
          grade_ss_song_ids: number[]
          grade_ss_song_titles: string[]
          grade_s_song_ids: number[]
          grade_s_song_titles: string[]
          grade_a_song_ids: number[]
          grade_a_song_titles: string[]
          grade_b_song_ids: number[]
          grade_b_song_titles: string[]
          grade_c_song_ids: number[]
          grade_c_song_titles: string[]
          grade_d_song_ids: number[]
          grade_d_song_titles: string[]
          grade_f_song_ids: number[]
          grade_f_song_titles: string[]
        }[]
      }
      get_user_stats: {
        Args: {
          input_user_id: number
        }
        Returns: {
          level: number
          song_count: number
          clear_count: number
          fail_count: number
          no_play_count: number
          grade_p: number
          grade_ss: number
          grade_s: number
          grade_a: number
          grade_b: number
          grade_c: number
          grade_d: number
          grade_f: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
