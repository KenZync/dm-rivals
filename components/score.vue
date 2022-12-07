<template>
  <div v-if="submitted">
    <div class="text-center mb-2 text-stone-200 font-medium">
      <a
        class="hover:underline hover:text-blue-500"
        :href="'https://dpjam.net/player-scoreboard/' + userID + '/2'"
        >{{ submitted }}</a
      >'s Win : {{ filteredCompareData.length }} scores
    </div>
    <table
      class="border border-gray-300 divide-y divide-gray-300 text-stone-200"
    >
      <tr :class="color">
        <th>{{ submitted }}'s Rank</th>
        <th>Title</th>
        <th>Accuracy</th>
        <th>Progress</th>
        <th>Clear</th>
        <th>Level</th>
        <th class="px-6">PlayTime</th>
      </tr>
      <tbody>
        <tr
          class="text-center even:bg-zinc-800 odd:bg-zinc-900"
          v-for="score in filteredCompareData"
        >
          <td class="py-3">{{ score.Rank }}</td>
          <td>
            <a
              class="hover:underline hover:text-blue-500"
              :href="'https://dpjam.net/music-scoreboard/' + score.ID"
              >{{ score.Title }}</a
            >
          </td>
          <td>
            <span
              class="hover:underline hover:text-blue-500 cursor-pointer"
              :class="fetching ? 'cursor-wait' : 'cursor-pointer'"
              @click="getScore(userID, score.ID, score.Title)"
              >{{ score.Acc }}</span
            >
          </td>
          <td>
            <span
              class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-stone-100"
              :class="progressColor(score.Progress)"
              >{{ score.Progress }}</span
            >
          </td>
          <td>
            <span
              class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-stone-100"
              :class="score.Clear == 'Cleared' ? 'bg-green-800' : 'bg-red-800'"
              >{{ score.Clear }}</span
            >
          </td>
          <td>{{ score.Level }}</td>
          <td :class="score.PlayTime2 ? 'flex flex-col' : ''">
            <span
              class="group relative inline-block text-blue-200 hover:text-blue-500 duration-300"
            >
              {{ convertTimeFromNow(score.PlayTime) }}
              <span
                class="absolute hidden group-hover:flex -left-5 -top-2 -translate-y-full w-32 px-2 py-1 bg-gray-700 rounded-lg text-center text-white after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700"
                >{{ convertTime(score.PlayTime) }}</span
              >
            </span>
            <span
              class="group relative inline-block text-red-200 hover:text-red-500 duration-300"
              v-if="score.PlayTime2"
            >
              {{ convertTimeFromNow(score.PlayTime2) }}
              <span
                class="absolute hidden group-hover:flex -left-5 -top-2 -translate-y-full w-32 px-2 py-1 bg-gray-700 rounded-lg text-center text-white after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700"
                >{{ convertTime(score.PlayTime2) }}</span
              >
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  userID: String,
  submitted: String,
  filteredCompareData: Object,
  color: String,
});

const fetching = ref(false);

const convertTime = (time) => {
  return $dayjs.tz(time, "Asia/Seoul").local().format("D MMM YYYY HH:mm:ss");
};

const convertTimeFromNow = (time) => {
  return $dayjs.tz(time, "Asia/Seoul").local().fromNow();
};

const progressColor = (rank) => {
  switch (rank) {
    case "P Rank":
      return "bg-yellow-400";
    case "SS Rank":
      return "bg-amber-600";
    case "S Rank":
      return "bg-lime-500";
    case "A Rank":
      return "bg-cyan-900";
    case "B Rank":
      return "bg-blue-900";
    case "C Rank":
      return "bg-fuchsia-400";
    case "D Rank":
      return "bg-rose-900";
    case "F Rank":
      return "bg-neutral-400";
    default:
      return "";
  }
};

const getScore = async (userID, songID, songTitle) => {
  fetching.value = true;

  const data = await $fetch(
    `/api/score?userID=${encodeURIComponent(
      userID
    )}&songID=${encodeURIComponent(songID)}`
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

  alert(
    // "Rank : " +
    //   data.Rank + " PlayTime : " + data.PlayTime +
    //   "\n" +
    "Song : " +
      songTitle +
      "\nPlayer : " +
      data.Name +
      "\nCool : " +
      data.Cool +
      "\nGood : " +
      data.Good +
      "\nBad : " +
      data.Bad +
      "\nMiss : " +
      data.Miss +
      "\nMaxCombo : " +
      data.MaxCombo
    // "\n" +
    // "Acc : " +
    // data.Acc +
    // "\n" +
    // "Progress : " +
    // data.Progress +
    // "\n" +
    // "Clear : " +
    // data.Clear
  );
};
</script>
