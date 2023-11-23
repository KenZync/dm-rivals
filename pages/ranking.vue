<template>
  <div class="container mx-auto text-white">
    <div class="flex flex-col justify-center items-center">
      <button
        class="mt-4 rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2"
      >
        Cleared/Failed
      </button>
      <div class="flex w-full pt-4 flex-col md:flex-row">
        <div class="grow">
          <ClientOnly>
            <apexchart
              class="flex justify-center"
              width="90%"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </ClientOnly>
        </div>
        <div class="w-80">
          <e-data-table
            :headers="headers"
            :items="musics"
            :rows-per-page="15"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from "~/types/supabase";
import type { Header } from "vue3-easy-data-table";

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
  colors: ["#FF0000", "#32CD32"],
  chart: {
    type: "bar",
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
    title: {
      text: "Level of Charts",
      offsetY: -10,
    },
  },
  title: {
    text: "Unique Play Counts Per Level Charts",
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
    data: clearedLists.value,
  },
];

const headers: Header[] = [
  { text: "Level", value: "level", sortable: true },
  { text: "Total", value: "played", sortable: true },
  { text: "Cleared", value: "clears", sortable: true },
  { text: "Failed", value: "fails", sortable: true },
];
</script>
