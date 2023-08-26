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

}
