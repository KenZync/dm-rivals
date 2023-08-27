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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
