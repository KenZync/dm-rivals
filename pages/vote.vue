<template>
  <div class="min-h-screen bg-zinc-900">
    <div class="container mx-auto">
      <!-- <div class="pt-8 text-center text-stone-200">
        <NuxtLink to="/">Back</NuxtLink>
      </div> -->
      <div>
          <div class="inline-flex mt-1 rounded-md shadow-sm">
            <span
              class="inline-flex items-center rounded-l-md border border-r-0 border-gray-600 bg-zinc-800 px-3 text-stone-200 text-sm"
              >Search</span
            >
            <input
            autofocus
              v-model="search"
              type="text"
              name="search"
              id="search"
              class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-600 px-3 py-2 text-stone-200 focus:border-blue-500 focus:ring-blue-500 text-sm bg-zinc-700"
              placeholder="Songe Title"
            />
          </div>
        <div class="flex space-x-2 overflow-auto h-screen">
          <div class="space-x-2 mb-4">
            <div v-if="data">
            <table
              class="border border-gray-300 divide-y divide-gray-300 text-stone-200 border-collapse"
            >
              <thead class="sticky top-0 z-10 bg-blue-900">
                <tr>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>NoteCharter</th>
                  <th>Level</th>
                  <th>BPM</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="music in data">
                  <tr>
                    <td>{{ music.Title }}</td>
                    <td>{{ music.Artist }}</td>
                    <td>{{ music.NoteCharter }}</td>
                    <td>{{ music.Level }}</td>
                    <td>{{ music.BPM }}</td>
                  </tr>
                  <!-- <tr class="text-center " :class="score.Win ? 'bg-green-800':'even:bg-zinc-800 odd:bg-zinc-900'">
            <td class="py-4">{{ score.Rank }}</td>
            <td>
              <a
                class="hover:underline hover:text-blue-500"
                :href="'https://dmjam.net/music-scoreboard/' + score.ID"
                >{{ score.Title }}</a
              >
            </td>
            <td :class="score.AccRival ? 'flex flex-col' : ''">
              <span
                class="hover:underline"
                :class="[
                  fetching ? 'cursor-wait' : 'cursor-pointer',
                  color == 'blue'
                    ? 'text-blue-200 hover:text-blue-500'
                    : 'text-red-200 hover:text-red-500',
                ]"
                @click="
                  fetching ? null : getScore(userID, score.ID, score.Title)
                "
                >{{ score.Acc }}</span
              >
              <span
                v-if="score.AccRival"
                class="hover:underline"
                :class="[
                  fetching ? 'cursor-wait' : 'cursor-pointer',
                  color == 'red'
                    ? 'text-blue-200 hover:text-blue-500'
                    : 'text-red-200 hover:text-red-500',
                ]"
                @click="
                  fetching ? null : getScore(rivalID, score.ID, score.Title)
                "
                >{{ score.AccRival }}</span
              >
            </td>
            <td>
              <span
                class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-stone-100"
                :class="progressColor(score.Clear)"
                >{{ score.Clear }}</span
              >
            </td>
            <td>
              <span
                class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-stone-100"
                :class="clearColor(score.Progress)"
                >{{ score.Progress }}</span
              >
            </td>
            <td>{{ score.Level }}</td>
            <td :class="score.PlayTime2 ? 'flex flex-col' : ''">
              <span
                class="group relative inline-block duration-300"
                :class="
                  color == 'blue'
                    ? 'text-blue-200 hover:text-blue-500'
                    : 'text-red-200 hover:text-red-500'
                "
                v-if="score.Clear != '-----'"
              >
                {{ convertTimeFromNow(score.PlayTime) }}
                <span
                  class="absolute hidden group-hover:flex -left-5 -top-2 -translate-y-full w-32 px-2 py-1 bg-gray-700 rounded-lg text-center text-white after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700 z-20"
                  >{{ convertTime(score.PlayTime) }}</span
                >
              </span>
              <span
                class="group relative inline-block duration-300"
                :class="
                  color == 'red'
                    ? 'text-blue-200 hover:text-blue-500'
                    : 'text-red-200 hover:text-red-500'
                "
                v-if="score.PlayTime2"
              >
                {{ convertTimeFromNow(score.PlayTime2) }}
                <span
                  class="absolute hidden group-hover:flex -left-5 -top-2 -translate-y-full w-32 px-2 py-1 bg-gray-700 rounded-lg text-center text-white after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700 z-20"
                  >{{ convertTime(score.PlayTime2) }}</span
                >
              </span>
            </td>
          </tr> -->
                </template>
              </tbody>
            </table>
          </div>
            <!-- <button
              class="mt-4 inline-flex items-center rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="toggleSortLevel()"
            >
              <span v-if="lowestFirst">Sort Lowest Level First</span>
              <span v-else>Sort Highest Level First</span>
            </button> -->
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from "../types/supabase";
useHead({
  title: "Voting System",
  meta: [{ name: "description", content: "O2Jam score comparison" }],
});
const user = useSupabaseUser();
const client = useSupabaseClient<Database>();
const search = ref();
const lowestFirst = ref();

const { data, error, refresh } = await useFetch(`/api/songlists`);

// const toggleSortLevel = () => {
//   lowestFirst.value = !lowestFirst.value;
//   var order = lowestFirst.value ? 1 : -1;
//   if (compareData1.value) {
//     compareData1.value.sort(function (a, b) {
//       var levelA = parseInt(a.Level);
//       var levelB = parseInt(b.Level);
//       var results = levelB - levelA;
//       return results * order;
//     });
//   }
//   if (compareData2.value) {
//     compareData2.value.sort(function (a, b) {
//       var levelA = parseInt(a.Level);
//       var levelB = parseInt(b.Level);
//       var results = levelB - levelA;
//       return results * order;
//     });
//   }
// };
</script>
