<template>
    <div class="container mx-auto text-white">
      <div class="flex flex-col justify-center">
        <div class="inline-flex my-4 rounded-md shadow-sm">
          <span
            class="inline-flex items-center rounded-l-md border border-r-0 border-gray-600 bg-zinc-800 px-3 text-stone-200 text-sm"
            >Search</span
          >
          <input
            v-model="searchValue"
            type="text"
            name="search"
            id="search"
            class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-600 px-3 py-2 text-stone-200 focus:border-blue-500 focus:ring-blue-500 text-sm bg-zinc-700"
            placeholder="User ID, Nickname, Tier, Clear"
          />
        </div>
        <e-data-table
          :headers="headers"
          :items="musics"
          :rows-per-page="15"
          :search-field="searchField"
          :search-value="searchValue"
        >
            <template #item-user_id="{ user_id }">
            <div @click="navigateTo(`players/${user_id}`)" class="font-bold cursor-pointer">{{ user_id }}</div>
          </template>
          <template #item-nickname="{ nickname, user_id }">
            <div @click="navigateTo(`players/${user_id}`)" class="font-bold cursor-pointer">{{ nickname }}</div>
          </template>
        </e-data-table>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Database } from "~/types/supabase";
  import type { Header } from "vue3-easy-data-table";
  
  const client = useSupabaseClient<Database>();
  
  const { data: musics } = await useAsyncData("musics", async () => {
    const { data } = await client
      .from("users")
      .select()
      .order("clear", { ascending: false });
    return data;
  });
  
  const searchField = [
    "user_id",
    "nickname",
    "tier",
    "clear",
  ];
  const searchValue = ref();
  
  const headers: Header[] = [
    { text: "User ID", value: "user_id", sortable: true },
    { text: "Nickname", value: "nickname", sortable: true },
    { text: "Tier", value: "tier", sortable: true },
    { text: "Clear", value: "clear", sortable: true },
  ];
  </script>
  
  <style scoped></style>
  