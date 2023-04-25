<template>
  <div class="container mx-auto">
    <form>
      <div class="md:flex md:space-x-2">
        <div>
          <label for="compare1" class="text-md font-medium text-stone-200"
            >Player 1</label
          >
          <div class="mt-1">
            <input
              type="text"
              v-model="user1"
              id="compare1"
              name="compare2"
              placeholder="Name"
              autofocus
              class="text-stone-200 bg-zinc-700 rounded-md border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
        <div>
          <label for="compare2" class="text-md font-medium text-stone-200"
            >Player 2</label
          >
          <div class="mt-1">
            <input
              type="text"
              v-model="user2"
              id="compare2"
              name="compare2"
              placeholder="Name"
              class="text-stone-200 bg-zinc-700 rounded-md border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
        <div>
          <div class="text-md font-medium text-stone-200">Press Enter</div>
          <div
            v-if="fetching"
            class="mt-1 inline-flex items-center rounded-md border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
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
              @click="replaceUrl"
              class="mt-1 inline-flex items-center rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Search / Compare
            </button>
          </div>
        </div>

        <SwitchGroup as="div" class="flex items-center pt-6">
          <Switch
            v-model="allSongs"
            :class="[
              allSongs ? 'bg-blue-600' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            ]"
          >
            <span class="sr-only">All Song Settings</span>
            <span
              :class="[
                allSongs ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
              ]"
            >
              <span
                :class="[
                  allSongs
                    ? 'opacity-0 ease-out duration-100'
                    : 'opacity-100 ease-in duration-200',
                  'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                ]"
                aria-hidden="true"
              >
                <svg
                  class="h-3 w-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 12 12"
                >
                  <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span
                :class="[
                  allSongs
                    ? 'opacity-100 ease-in duration-200'
                    : 'opacity-0 ease-out duration-100',
                  'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                ]"
                aria-hidden="true"
              >
                <svg
                  class="h-3 w-3 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path
                    d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                  />
                </svg>
              </span>
            </span>
          </Switch>
          <SwitchLabel as="span" class="ml-3">
            <span class="text-sm font-medium text-stone-200"
              >Show All Songs</span
            >
          </SwitchLabel>
        </SwitchGroup>
      </div>
    </form>

    <div v-if="compare">
      <SwitchGroup
        as="div"
        class="flex items-center pt-4"
        v-if="submitted1 && submitted2"
      >
        <Switch
          v-if="compare"
          v-model="bothPlayed"
          :class="[
            bothPlayed ? 'bg-blue-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          ]"
        >
          <span class="sr-only">Use setting</span>
          <span
            :class="[
              bothPlayed ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            ]"
          >
            <span
              :class="[
                bothPlayed
                  ? 'opacity-0 ease-out duration-100'
                  : 'opacity-100 ease-in duration-200',
                'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
              ]"
              aria-hidden="true"
            >
              <svg
                class="h-3 w-3 text-gray-400"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path
                  d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span
              :class="[
                bothPlayed
                  ? 'opacity-100 ease-in duration-200'
                  : 'opacity-0 ease-out duration-100',
                'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
              ]"
              aria-hidden="true"
            >
              <svg
                class="h-3 w-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path
                  d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                />
              </svg>
            </span>
          </span>
        </Switch>
        <SwitchLabel as="span" class="ml-3">
          <span class="text-sm font-medium text-stone-200"
            >Show only both Played</span
          >
        </SwitchLabel>
      </SwitchGroup>
      <div class="space-x-2 mb-4">
        <div class="inline-flex mt-1 rounded-md shadow-sm">
          <span
            class="inline-flex items-center rounded-l-md border border-r-0 border-gray-600 bg-zinc-800 px-3 text-stone-200 text-sm"
            >Search</span
          >
          <input
            v-model="search"
            type="text"
            name="search"
            id="search"
            class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-600 px-3 py-2 text-stone-200 focus:border-blue-500 focus:ring-blue-500 text-sm bg-zinc-700"
            placeholder="Songe Title"
          />
        </div>
        <button
          class="mt-4 inline-flex items-center rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="toggleSortTime()"
        >
          <span v-if="oldestFirst">Sort Oldest First</span>
          <span v-else>Sort Newest First</span>
        </button>

        <button
          class="mt-4 inline-flex items-center rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="toggleSortLevel()"
        >
          <span v-if="lowestFirst">Sort Lowest Level First</span>
          <span v-else>Sort Highest Level First</span>
        </button>
      </div>

      <LazyCompare
        :id1="id1"
        :id2="id2"
        :submitted1="submitted1"
        :submitted2="submitted2"
        :filteredCompareData1="filteredCompareData1"
        :filteredCompareData2="filteredCompareData2"
      ></LazyCompare>
    </div>
  </div>
</template>

<script setup>
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
const router = useRouter();
const route = useRoute();

const user1 = ref(route.query.user1 || "");
const user2 = ref(route.query.user2 || "");
const allSongs = ref(JSON.parse(route.query.allSongs || false));

watch(
  () => route.query,
  () => {
    user1.value = route.query.user1;
    user2.value = route.query.user2;
    allSongs.value = JSON.parse(route.query.allSongs || false);
    if (user1.value.length || user2.value.length) {
      getCompare();
    }
  }
);

onMounted(() => {
  if (user1.value.length || user2.value.length) {
    getCompare();
  }
});

const fetching = ref(false);
const compare = ref(false);

const submitted1 = ref("");
const submitted2 = ref("");

const id1 = ref("");
const id2 = ref("");

const compareData1 = ref();
const compareData2 = ref();

const bothPlayed = ref(false);

const oldestFirst = ref(false);
const lowestFirst = ref(false);

const search = ref("");

const toggleSortTime = () => {
  oldestFirst.value = !oldestFirst.value;
  var order = oldestFirst.value ? 1 : -1;
  if (compareData1.value) {
    compareData1.value.sort(function (a, b) {
      a = new Date(a.PlayTime);
      b = new Date(b.PlayTime);
      var results = a > b ? -1 : a < b ? 1 : 0;
      return results * order;
    });
  }

  if (compareData2.value) {
    compareData2.value.sort(function (a, b) {
      a = new Date(a.PlayTime);
      b = new Date(b.PlayTime);
      var results = a > b ? -1 : a < b ? 1 : 0;
      return results * order;
    });
  }
};

const toggleSortLevel = () => {
  lowestFirst.value = !lowestFirst.value;
  var order = lowestFirst.value ? 1 : -1;
  if (compareData1.value) {
    compareData1.value.sort(function (a, b) {
      var levelA = parseInt(a.Level);
      var levelB = parseInt(b.Level);
      var results = levelB - levelA;
      return results * order;
    });
  }
  if (compareData2.value) {
    compareData2.value.sort(function (a, b) {
      var levelA = parseInt(a.Level);
      var levelB = parseInt(b.Level);
      var results = levelB - levelA;
      return results * order;
    });
  }
};

const filteredCompareData1 = computed(() => {
  return filterData(compareData1.value);
});

const filteredCompareData2 = computed(() => {
  return filterData(compareData2.value);
});

const filterData = (data) => {
  if (data) {
    var searched = data.filter(({ Title }) =>
      [Title].some((val) =>
        val.toLowerCase().includes(search.value.toLowerCase())
      )
    );

    if (!bothPlayed.value) {
      return searched;
    } else {
      return searched.filter((score) => {
        return score.Rank.includes("|");
      });
    }
  }
};
const replaceUrl = () =>{
  router.replace({
    query: { user1: user1.value, user2: user2.value, allSongs: allSongs.value },
  });

}

const getCompare = async () => {
  fetching.value = true;
  const data = await $fetch(
    `/api/compare?user1=${encodeURIComponent(
      user1.value
    )}&user2=${encodeURIComponent(user2.value)}&allSongs=${allSongs.value}`
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

  compareData1.value = data.win1;
  compareData2.value = data.win2;
  compare.value = true;

  submitted1.value = user1.value;
  submitted2.value = user2.value;

  id1.value = data.id1;
  id2.value = data.id2;
};
</script>
