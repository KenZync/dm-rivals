<template>
  <div class="text-xs font-semibold leading-6 text-stone-200">Your Rivals</div>
  <ul role="list" class="-mx-2 mt-2 space-y-1">
    <li v-for="(rival, index) in rivals" :key="index">
      <div class="flex space-x-2">
        <NuxtLink
          :to="{
            path: '/',
            query: { user1: props.player, user2: rival, allSongs: false },
          }"
          :class="
            user1 === props.player && user2 === rival ? 'bg-zinc-800' : ''
          "
          class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full text-stone-200 hover:text-white hover:bg-zinc-800"
        >
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-zinc-900 text-[0.625rem] font-medium text-stone-200 group-hover:text-white"
            >{{ rival[0] }}</span
          >
          <span class="truncate">{{ rival }}</span>
        </NuxtLink>
        <button
          v-if="user1 === props.player && user2 === rival"
          @click="deleteRival(index)"
          class="flex-grow text-right text-stone-200 hover:text-red-500 hover:bg-zinc-800 p-2 rounded-lg"
        >
          <TrashIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
        </button>
      </div>
    </li>
    <li v-if="!addingRival">
      <button
        @click="rivalAdd"
        class="w-full text-stone-200 hover:text-white hover:bg-zinc-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold active:bg-zinc-500"
      >
        <UserPlusIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
        Add Rival
      </button>
    </li>
    <li v-if="addingRival">
      <form class="flex space-x-2">
        <input
          type="text"
          class="w-full text-stone-200 bg-zinc-700 rounded-md border-gray-600 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Rival Name"
          v-model="rivalInput"
        />
        <button
          @click.prevent="submitRival"
          class="flex-grow text-right text-stone-200 hover:text-green-500 hover:bg-zinc-800 p-2 rounded-lg active:bg-zinc-500"
        >
          <CheckIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
        </button>
      </form>
    </li>
    <li>
      <div class="flex space-x-2">
        <button
        @click="showOnlinePlayers ? refresh(): toggleOnlinePlayers()"
        class="text-stone-200 hover:text-white hover:bg-zinc-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full active:bg-zinc-500"
      >
        <ArrowPathIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
        <span v-if="showOnlinePlayers">Refresh Online Players</span>
        <span v-else>Show Online Players</span>
      </button>
        <button
          v-if="showOnlinePlayers"
          @click="toggleOnlinePlayers"
          class="flex-grow text-right text-stone-200 hover:text-red-500 hover:bg-zinc-800 p-2 rounded-lg"
        >
        <EyeSlashIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
        </button>
      </div>
    </li>
    <li>
      <iframe
        v-if="showOnlinePlayers"
        class="w-64 h-72"
        src="https://dmjam.net/online"
        :key="iframeUpdate"
      />
    </li>
  </ul>
</template>

<script setup>
import { UserPlusIcon, CheckIcon } from "@heroicons/vue/20/solid";
import { TrashIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import { ArrowPathIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  player: String,
});

const addingRival = ref(false);
const iframeUpdate = ref(true);
const rivalInput = ref(null);
const rivals = ref([]);

const showOnlinePlayers=ref(true)

const route = useRoute();
const user1 = ref(route.query.user1);
const user2 = ref(route.query.user2);

const rivalUsers = useRivals();

watch(
  () => route.query,
  () => {
    user1.value = route.query.user1;
    user2.value = route.query.user2;
  }
);

onMounted(() => {
  if (localStorage.getItem("rivals")) {
    try {
      rivals.value = JSON.parse(localStorage.getItem("rivals"));
      rivalUsers.value = rivals.value
    } catch (e) {
      localStorage.removeItem("rivals");
      rivalUsers.value = null
    }
  }
});

const rivalAdd = () => {
  addingRival.value = true;
};

const saveRivals = () => {
  const parsed = JSON.stringify(rivals.value);
  localStorage.setItem("rivals", parsed);
  rivalUsers.value = parsed
};
const deleteRival = (x) => {
  rivals.value.splice(x, 1);
  saveRivals();
};

const submitRival = () => {
  addingRival.value = false;
  // ensure they actually typed something
  if (!rivalInput.value) {
    return;
  }
  console.log(rivalInput.value);
  rivals.value.push(rivalInput.value);
  rivalInput.value = "";
  saveRivals();
};

const refresh = () => {
  iframeUpdate.value = !iframeUpdate.value;
};

const toggleOnlinePlayers = () => {
  showOnlinePlayers.value = !showOnlinePlayers.value;
};
</script>
