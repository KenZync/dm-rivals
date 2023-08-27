<template>
  <div class="container mx-auto text-white">
    <div class="flex flex-col justify-center">
      <div v-for="music,index in musics">
        <div>{{index}},{{music.id}},{{music.title}},{{music.artist}},{{ music.note_charter }},{{music.level}},{{music.bpm}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from "~/types/supabase";

const client = useSupabaseClient<Database>();

const { data: musics } = await useAsyncData("musics", async () => {
  const { data } = await client.from("musics").select();

  return data;
});

//   const levelLists = computed(() => {
//     if (musics.value) return musics.value.map((item) => item.level);
//   });

//   const playedLists = computed(() => {
//     if (musics.value) return musics.value.map((item) => item.played);
//   });

//   const clearedLists = computed(() => {
//     if (musics.value) return musics.value.map((item) => item.clears);
//   });

//   const failedLists = computed(() => {
//     if (musics.value) return musics.value.map((item) => item.fails);
//   });
</script>

<style scoped></style>
