<template>
  <div class="min-h-screen bg-zinc-900">
    <div class="container mx-auto">
      <div class="pt-8 text-center text-5xl text-stone-200">
        DMJam Rival System
      </div>
      <form>
        <div class="flex space-x-2">
          <div>
            <label for="compare1" class="text-md font-medium text-stone-200"
              >User 1</label
            >
            <div class="mt-1">
              <input
                type="text"
                v-model="user1"
                id="compare1"
                name="compare2"
                placeholder="Name 1"
                autofocus
                class="text-stone-200 bg-zinc-800 rounded-md border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label for="compare2" class="text-md font-medium text-stone-200"
              >User 2</label
            >
            <div class="mt-1">
              <input
                type="text"
                v-model="user2"
                id="compare2"
                name="compare2"
                placeholder="Name 2"
                class="text-stone-200 bg-zinc-800 rounded-md border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                @click="getCompare"
                class="mt-1 inline-flex items-center rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Compare
              </button>
            </div>
          </div>
        </div>
      </form>
      <fieldset class="space-y-5" v-if="compare">
        <legend class="sr-only">Filter</legend>
        <div class="relative flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              v-model="bothPlayed"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="comments" class="font-medium text-stone-200"
              >Show only both Played</label
            >
          </div>
        </div>
      </fieldset>

      <button
        class="mt-4 inline-flex items-center rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        v-if="compare"
        @click="toggleSortTime()"
      >
        <span v-if="oldestFirst">Sort Oldest First</span>
        <span v-else>Sort Newest First</span>
      </button>

      <div class="flex space-x-2" v-if="compare">
        <div>
          <div class="text-center mb-2 text-stone-200 font-medium">
            {{ submitted1 }}'s Win
          </div>
          <table
            class="min-w-full border border-gray-300 divide-y divide-gray-300 text-stone-200 table-auto"
          >
            <tr class="divide-x divide-gray-200 bg-gray-900">
              <th>{{ submitted1 }}'s Rank</th>
              <th>Title</th>
              <th>Acc</th>
              <th>Progress</th>
              <th>Clear</th>
              <th>Level</th>
              <th>PlayTime</th>
            </tr>
            <tbody class="divide-y divide-gray-200">
              <tr
                class="text-center"
                v-for="(score, key) in filteredCompareData1"
                :class="key % 2 === 0 ? undefined : 'bg-zinc-800'"
              >
                <td>{{ score.Rank }}</td>
                <td>
                  <a
                    class="hover:underline hover:text-blue-500"
                    :href="'https://dpjam.net/music-scoreboard/' + score.ID"
                    >{{ score.Title }}</a
                  >
                </td>
                <td>{{ score.Acc }}</td>
                <td>{{ score.Progress }}</td>
                <td>
                  <span
                    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-stone-100"
                    :class="
                      score.Clear == 'Cleared' ? 'bg-green-800' : 'bg-red-500'
                    "
                    >{{ score.Clear }}</span
                  >
                </td>
                <td>{{ score.Level }}</td>
                <td>{{ score.PlayTime }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div class="text-center mb-2 text-stone-200 font-medium">
            {{ submitted2 }}'s Win
          </div>
          <table
            class="min-w-full border border-gray-300 divide-y divide-gray-300 text-stone-200 table-auto"
          >
            <tr class="divide-x divide-gray-200 bg-red-900">
              <th>{{ submitted2 }}'s Rank</th>
              <th>Title</th>
              <th>Acc</th>
              <th>Progress</th>
              <th>Clear</th>
              <th>Level</th>
              <th>PlayTime</th>
            </tr>
            <tbody class="divide-y divide-gray-200">
              <tr
                class="text-center"
                v-for="(score, key) in filteredCompareData2"
                :class="key % 2 === 0 ? undefined : 'bg-zinc-800'"
              >
                <td>{{ score.Rank }}</td>
                <td>
                  <a
                    class="hover:underline hover:text-blue-500"
                    :href="'https://dpjam.net/music-scoreboard/' + score.ID"
                    >{{ score.Title }}</a
                  >
                </td>
                <td>{{ score.Acc }}</td>
                <td>{{ score.Progress }}</td>
                <td>
                  <span
                    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-stone-100"
                    :class="
                      score.Clear == 'Cleared' ? 'bg-green-800' : 'bg-red-500'
                    "
                    >{{ score.Clear }}</span
                  >
                </td>
                <td>{{ score.Level }}</td>
                <td>{{ score.PlayTime }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "DMJam Rival System",
  meta: [{ name: "description", content: "O2Jam score comparison" }],
});
const fetching = ref(false);
const user1 = ref("");
const user2 = ref("");

const submitted1 = ref("");
const submitted2 = ref("");

const compare = ref(false);

const compareData1 = ref();
const compareData2 = ref();

const bothPlayed = ref(false);

const oldestFirst = ref(false);

const toggleSortTime = () => {
  oldestFirst.value = !oldestFirst.value;
  var order = oldestFirst.value ? 1 : -1;
  compareData1.value.sort(function (a, b) {
    a = new Date(a.PlayTime);
    b = new Date(b.PlayTime);
    var results = a > b ? -1 : a < b ? 1 : 0;
    return results * order;
  });
  compareData2.value.sort(function (a, b) {
    a = new Date(a.PlayTime);
    b = new Date(b.PlayTime);
    var results = a > b ? -1 : a < b ? 1 : 0;
    return results * order;
  });
};

const filteredCompareData1 = computed(() => {
  let data = compareData1.value;
  if (!bothPlayed.value) {
    return compareData1.value;
  } else {
    return compareData1.value.filter((score) => {
      return score.Rank.includes("|");
    });
  }
});

const filteredCompareData2 = computed(() => {
  if (!bothPlayed.value) {
    return compareData2.value;
  } else {
    return compareData2.value.filter((score) => {
      return score.Rank.includes("|");
    });
  }
});

const getCompare = async () => {
  fetching.value = true;
  const data = await $fetch(
    `/api/compare?user1=${encodeURIComponent(
      user1.value
    )}&user2=${encodeURIComponent(user2.value)}`
  )
    .catch((error) => {
      if (error.status === 404) {
        alert("User not found. One of users is typed incorrectly.");
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
};
</script>
