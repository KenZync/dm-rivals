<template>
  <div v-if="(submitted)">
    <div class="text-center mb-2 text-stone-200 font-medium">
      {{ submitted }}'s Win : {{ filteredCompareData.length }} scores
    </div>
    <table
      class="min-w-full border border-gray-300 divide-y divide-gray-300 text-stone-200 table-auto"
    >
      <tr class="divide-x divide-gray-200" :class="color">
        <th>{{ submitted }}'s Rank</th>
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
          v-for="(score, key) in filteredCompareData"
          :class="key % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-800'"
        >
          <td class="py-3">{{ score.Rank }}</td>
          <td>
            <a
              class="hover:underline hover:text-blue-500"
              :href="'https://dpjam.net/music-scoreboard/' + score.ID"
              >{{ score.Title }}</a
            >
          </td>
          <td>{{ score.Acc }}</td>
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
              :class="score.Clear == 'Cleared' ? 'bg-green-800' : 'bg-red-500'"
              >{{ score.Clear }}</span
            >
          </td>
          <td>{{ score.Level }}</td>
          <td>{{ score.PlayTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

const props = defineProps({
  submitted: String,
  filteredCompareData: Object,
  color: String
});

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

</script>

<style lang="scss" scoped></style>
