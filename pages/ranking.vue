<template>
  <div class="container mx-auto text-white">
    <!-- {{ musics }} -->
    <div class="flex justify-center">
      <ClientOnly>
        <apexchart
          width="1200"
          type="bar"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </ClientOnly>
      <!-- {{ musics }} -->
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
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: levelLists.value,
  },
  yaxis: {
    title: {
      text: "Clear (Count)",
    },
  },
  fill: {
    opacity: 1,
  },
  // tooltip: {
  //   y: {
  //     formatter: function (val) {
  //       return "$ " + val + " thousands"
  //     }
  //   }
  // }
  theme: {
    mode: "dark",
  },
};

const series = [
  {
    name: "Played",
    data: clearedLists.value,
  },
  {
    name: "Cleared",
    data:  playedLists.value,
  },
  {
    name: "Failed",
    data:  failedLists.value,
  },
];
</script>

<style scoped></style>
