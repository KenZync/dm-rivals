<template>
  <div class="flex h-16 shrink-0 items-center">
    <img class="h-8 w-auto" src="~/assets/favicon-32x32.png" alt="DMJam" />
    <div class="pl-8 font-bold text-stone-200">DMJam Rival System</div>
  </div>
  <nav class="flex flex-1 flex-col">
    <ul role="list" class="flex flex-1 flex-col gap-y-7">
      <li>
        <ul role="list" class="-mx-2 space-y-1">
          <li v-for="item in navigation" :key="item.name">
            <NuxtLink
              :to="item.href"
              :class="[
                (route.path === item.href ? true : false)
                  ? 'bg-zinc-800 text-white'
                  : 'text-stone-200 hover:text-white hover:bg-zinc-800 active:bg-zinc-500',
                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ',
              ]"
            >
              <component
                :is="item.icon"
                class="h-6 w-6 shrink-0"
                aria-hidden="true"
              />
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li>
        <Rivals :player="playerUser" />
      </li>
      <li class="-mx-6 mt-auto">
        <NuxtLink
          :to="
            playerUser
              ? {
                  path: '/',
                  query: { user1: playerUser, allSongs: 'false' },
                }
              : '/setting'
          "
          class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-zinc-800"
          :class="(user1 === playerUser && !user2) ? 'bg-zinc-800' : ''"
        >
          <span
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-zinc-900 text-[0.625rem] font-medium text-stone-200 group-hover:text-white"
          >
            <UserIcon></UserIcon>
          </span>
          <span class="sr-only">Your profile</span>

          <span v-if="playerUser" aria-hidden="true">{{ playerUser }}</span>
          <span v-else>Click to Set Player Name</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import {
  MusicalNoteIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Cog6ToothIcon,
  PresentationChartBarIcon
} from "@heroicons/vue/24/outline";

import { UserIcon } from "@heroicons/vue/20/solid";
const route = useRoute();
const playerUser = usePlayer();

const user1 = ref(route.query.user1);
const user2 = ref(route.query.user2);
watch(
  () => route.query,
  () => {
    user1.value = route.query.user1;
    user2.value = route.query.user2;
  }
);

// console.log(user1.value)
// console.log(user2.value)

const navigation = [
  { name: "Compare Scores", href: "/", icon: MusicalNoteIcon },
  //   {
  //     name: "Vote and Comment",
  //     href: "/vote",
  //     icon: ChatBubbleOvalLeftEllipsisIcon,
  //     current: false,
  //   },
  { name: "Setting", href: "/setting", icon: Cog6ToothIcon },

  { name: "Ranking", href: "/ranking", icon:PresentationChartBarIcon },
];
</script>
