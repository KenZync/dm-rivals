export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      linking: {
        Row: {
          created_at: string | null
          dmjam_id: string | null
          dmjam_name: string | null
          id: number
          uuid: string | null
        }
        Insert: {
          created_at?: string | null
          dmjam_id?: string | null
          dmjam_name?: string | null
          id?: number
          uuid?: string | null
        }
        Update: {
          created_at?: string | null
          dmjam_id?: string | null
          dmjam_name?: string | null
          id?: number
          uuid?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
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
