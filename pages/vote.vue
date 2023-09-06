<template>
      <!-- <Compare
        id1="1001"
        id2="1002"
        submitted1="1111"
        submitted2="1111"
        :filteredCompareData1="win1"
        :filteredCompareData2="win2"
      /> -->
      <!-- <main class="lg:pr-96">
        <header
          class="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
        >
          <h1 class="text-base font-semibold leading-7 text-white">Scores</h1>


          <Menu as="div" class="relative">
            <MenuButton
              class="flex items-center gap-x-1 text-sm font-medium leading-6 text-white"
            >
              Sort by
              <ChevronUpDownIcon
                class="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </MenuButton>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900',
                    ]"
                    >Name</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900',
                    ]"
                    >Date updated</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900',
                    ]"
                    >Environment</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </header>

        <ul role="list" class="divide-y divide-white/5">
          <li
            v-for="deployment in deployments"
            :key="deployment.id"
            class="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
          >
            <div class="min-w-0 flex-auto">
              <div class="flex items-center gap-x-3">
                <div
                  :class="[
                    statuses[deployment.status],
                    'flex-none rounded-full p-1',
                  ]"
                >
                  <div class="h-2 w-2 rounded-full bg-current" />
                </div>
                <h2 class="min-w-0 text-sm font-semibold leading-6 text-white">
                  <a :href="deployment.href" class="flex gap-x-2">
                    <span class="truncate">{{ deployment.teamName }}</span>
                    <span class="text-gray-400">/</span>
                    <span class="whitespace-nowrap">{{
                      deployment.projectName
                    }}</span>
                    <span class="absolute inset-0" />
                  </a>
                </h2>
              </div>
              <div
                class="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400"
              >
                <p class="truncate">{{ deployment.description }}</p>
                <svg
                  viewBox="0 0 2 2"
                  class="h-0.5 w-0.5 flex-none fill-gray-300"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <p class="whitespace-nowrap">{{ deployment.statusText }}</p>
              </div>
            </div>
            <div
              :class="[
                environments[deployment.environment],
                'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset',
              ]"
            >
              {{ deployment.environment }}
            </div>
            <ChevronRightIcon
              class="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </li>
        </ul>
      </main> -->

      <!-- Recent Play -->
      <!-- <aside
        class="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5"
      >
        <header
          class="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
        >
          <h2 class="text-base font-semibold leading-7 text-white">
            Recent Play
          </h2>
          <a href="#" class="text-sm font-semibold leading-6 text-indigo-400"
            >View Profile</a
          >
        </header>
        <ul role="list" class="divide-y divide-white/5">
          <li
            v-for="item in activityItems"
            :key="item.commit"
            class="px-4 py-4 sm:px-6 lg:px-8"
          >
            <div class="flex items-center gap-x-3">
              <img
                :src="item.user.imageUrl"
                alt=""
                class="hidden h-6 w-6 flex-none rounded-full bg-zinc-900"
              />
              <h3
                class="flex-auto truncate text-sm font-semibold leading-6 text-white"
              >
                {{ item.user.name }}
              </h3>
              <time
                :datetime="item.dateTime"
                class="flex-none text-xs text-gray-600"
                >{{ item.date }}</time
              >
            </div>
            <p class="mt-3 truncate text-sm text-gray-500">
              A Rank Cleared
              Pushed to
              <span class="text-gray-400">{{ item.projectName }}</span> (<span
                class="font-mono text-gray-400"
                >{{ item.commit }}</span
              >
              on <span class="text-gray-400">{{ item.branch }}</span
              >)
            </p>
          </li>
        </ul>
      </aside> -->
</template>

<script setup lang="ts">
// const win1 = ref([
//   {
//     ID: "3280",
//     Title: "MATOI -phase L-AAAAAAAAAAAAAA",
//     Acc: "74.1%",
//     Progress: "Cleared",
//     Clear: "D Rank",
//     Rank: "10|13",
//     Level: "131",
//     PlayTime: "2023-04-03 01:51:24",
//     AccRival: "68.94%",
//     PlayTime2: "2023-04-03 04:58:17",
//   },
//   {
//     ID: "3280",
//     Title: "MATOI -phase L-",
//     Acc: "74.1%",
//     Progress: "Cleared",
//     Clear: "D Rank",
//     Rank: "10|13",
//     Level: "130",
//     PlayTime: "2023-04-03 01:51:24",
//     AccRival: "68.94%",
//     PlayTime2: "2023-04-03 04:58:17",
//   },
// ]);
// const win2 = ref([
//   {
//     ID: "3280",
//     Title: "MATOI -phase L-AAAAAAAAAAAAAAAAAAAAAAAAAAA",
//     Acc: "74.1%",
//     Progress: "Cleared",
//     Clear: "D Rank",
//     Rank: "10|13",
//     Level: "131",
//     PlayTime: "2023-04-03 01:51:24",
//     AccRival: "68.94%",
//     PlayTime2: "2023-04-03 04:58:17",
//   },
//   {
//     ID: "3280",
//     Title: "BMATOI -phase L-AAAAAAAAAAAAAAAAAAAAAAAAAAA",
//     Acc: "74.1%",
//     Progress: "Cleared",
//     Clear: "D Rank",
//     Rank: "10|13",
//     Level: "132",
//     PlayTime: "2023-04-03 01:51:24",
//     AccRival: "68.94%",
//     PlayTime2: "2023-04-03 04:58:17",
//   },
// ]);

</script>

<!-- <template>
  <div class="min-h-screen bg-zinc-900">
    <div class="container mx-auto">
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
                  </template>
                </tbody>
              </table>
            </div>
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
</script> -->
