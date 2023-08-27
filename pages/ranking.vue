<template>
  <div class="container mx-auto text-white">
    <div class="flex justify-center">
      <ClientOnly>
        <apexchart
          width="1200"
          type="bar"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from "~/types/supabase";

const client = useSupabaseClient<Database>();

const { data: musics } = await useAsyncData("musics", async () => {
  const { data } = await client.from("song_play_count").select();

  return data;
});

const levelLists = computed(() => {
  if (musics.value) return musics.value.map((item) => item.level);
});

const playedLists = computed(() => {
  if (musics.value) return musics.value.map((item) => item.played);
});

const clearedLists = computed(() => {
  if (musics.value) return musics.value.map((item) => item.clears);
});

const failedLists = computed(() => {
  if (musics.value) return musics.value.map((item) => item.fails);
});

const chartOptions = {
  chart: {
    type: "bar",
    height: 350,
    zoom: {
      enabled: true,
    },
    stacked: true,
  },
//   plotOptions: {
//     bar: {
//       dataLabels: {
//         total: {
//           enabled: true,
//           offsetX: 0,
//           style: {
//             fontSize: "13px",
//             fontWeight: 700,
//             color: "#FFFFFF",
//           },
//         },
//       },
//     },
//   },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    title: {
      text: "Unique Play (Count)",
    },
  },
  xaxis: {
    type: "categories",
    categories: levelLists.value,
    tickPlacement: "on",
    tickAmount: 40,
    decimalsInFloat: 0,
  },
  legend: {
    position: "right",
    offsetY: 40,
  },
  theme: {
    mode: "dark",
  },
};

const series = [
  {
    name: "Failed",
    data: failedLists.value,
  },
  {
    name: "Cleared",
    data: playedLists.value,
  },
];
</script>

<style scoped></style>
