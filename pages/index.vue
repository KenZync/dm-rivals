<template>
  <div class="bg-zinc-900">
    <div class="container mx-auto">
      <div class="pt-8 text-center text-stone-200">
        <!-- <div v-if="user">Welcome {{ user.user_metadata.name }}</div>
        <div v-else>Welcome to DMJam Rival System by KenZ</div>
        <button
          v-if="!user"
          @click="signInWithDiscord"
          class="mt-4 inline-flex items-center rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <img
            class="h-8 w-auto pr-4"
            src="~/assets/discord-mark-blue.svg"
            alt="Discover Nuxt 3"
          />
          Login With Discord
        </button>

        <button
          v-else
          @click="signout"
          class="mt-4 inline-flex items-center rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Signout
        </button> -->
        <div class="mt-4 flex flex-col justify-center items-center">
          <!-- <div class="flex space-x-4">
            <NuxtLink
              to="/compare"
              class="rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >Rival System</NuxtLink
            >
            <NuxtLink
              to="/vote"
              class="rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >Vote Chart Level</NuxtLink
            >
          </div>
          <div v-if="player">
            <div class="mt-4">DMJam Account Linked</div>
            ID: {{ player.dmjam_id }} Name: {{ player.dmjam_name }}
            <button
              @click="unlink"
              class="mt-4 flex items-center rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Unlink to this Account
            </button>
          </div>

          <div v-else-if="user">
            <div class="mt-4">Linking DMJam Account</div>
            <form>
              <div class="flex mt-4 space-x-4">
                <input
                  v-model="search"
                  type="text"
                  name="search"
                  id="search"
                  class="flex rounded-md border-gray-600 px-3 py-2 text-stone-200 focus:border-blue-500 focus:ring-blue-500 text-sm bg-zinc-700"
                  placeholder="Player"
                />
                <div
                  v-if="fetching"
                  class="inline-flex items-center rounded-md border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
                >
                  <div
                    class="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                    role="status"
                    aria-label="loading"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                  <div class="pl-2">Loading</div>
                </div>
                <div v-else>
                  <button
                    @click="getPlayer"
                    class="rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
            <div class="pt-4" v-if="playerData">
              <div>ID : {{ playerData.id }}</div>
              <div>Lv.{{ playerData.level }} {{ playerData.name }}</div>
              <div>Rank : {{ playerData.rank }}</div>
              <div v-if="linkPlayer" class="">
                This Account is already linked
              </div>
              <div v-else>
                <button
                  @click="linking"
                  class="mt-4 inline-flex items-center rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Link to this Account
                </button>
              </div>
            </div>
          </div> -->

          <div class="mt-4">Set Player Name : {{ playerUser }}</div>
          <div class="flex mt-4 space-x-4">
            <input
              v-model="playerUser"
              type="text"
              name="search"
              id="search"
              class="flex rounded-md border-gray-600 px-3 py-2 text-stone-200 focus:border-blue-500 focus:ring-blue-500 text-sm bg-zinc-700"
              placeholder="Player"
            />
            <button
              @click="setPlayer"
              class="rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Set
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Database } from "../types/supabase";
const user = useSupabaseUser();
const client = useSupabaseClient<Database>();
const search = ref();
const fetching = ref(false);
const playerData = ref();
const playerUser = ref();

onMounted(() => {
  if (localStorage.getItem("player")) {
    try {
      playerUser.value = localStorage.getItem("player");
    } catch (e) {
      localStorage.removeItem("player");
    }
  }
});

const signInWithDiscord = async () => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "discord",
  });
};

watch(
  () => user.value,
  () => {
    refresh();
  }
);

const signout = async () => {
  player.value = null;
  const { error } = await client.auth.signOut();
};

const setPlayer = () => {
  localStorage.setItem("player", playerUser.value);
};

const getPlayer = async () => {
  fetching.value = true;
  const data = await $fetch(
    `/api/player?user=${encodeURIComponent(search.value)}`
  )
    .catch((error) => {
      if (error.status === 404) {
        alert(error.data.statusMessage);
      } else {
        alert("ERROR TRY AGAIN");
      }
      return;
    })
    .finally(() => (fetching.value = false));

  if (!data) {
    return;
  }

  playerData.value = data;
  refreshLinkPlayer();
};

const linking = async () => {
  const newProfile = {
    uuid: user.value?.id,
    dmjam_id: playerData.value.id,
    dmjam_name: playerData.value.name,
  };
  const { error } = await client.from("linking").insert(newProfile);
  if (!error) {
    playerUser.value = playerData.value.name;
    setPlayer();
  }
  refresh();
};

const refresh = () => refreshNuxtData("linking");
const refreshLinkPlayer = () => refreshNuxtData("linkPlayer");

const { data: player } = await useAsyncData("linking", async () => {
  playerData.value = null;
  const { data } = await client
    .from("linking")
    .select("*")
    .eq("uuid", user.value?.id)
    .single();
  return data;
});

const { data: linkPlayer } = await useAsyncData("linkPlayer", async () => {
  const { data } = await client
    .from("linking")
    .select("*")
    .eq("dmjam_id", playerData.value.id)
    .single();
  return data;
});

const unlink = async () => {
  const { error } = await client
    .from("linking")
    .delete()
    .eq("uuid", user.value?.id);
  refresh();
};
</script>
