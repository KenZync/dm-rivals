<template>
  <div class="container mx-auto text-white">
    <div class="flex flex-col justify-center items-center">
      <div class="space-x-4">
        <button
          @click="clear"
          class="mt-4 rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2"
        >
          Lamps
        </button>
        <button
          @click="grade"
          class="mt-4 rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2"
        >
          Grade
        </button>
      </div>
      <div class="flex w-full pt-4 flex-col md:flex-row">
        <ClientOnly>
          <div class="grow">
            <!-- <apexchart
              class="flex justify-center"
              width="100%"
              :options="chartOptions"
              :series="series"
            ></apexchart> -->
            <apexchart
              class="flex justify-center"
              v-if="mode === `clear`"
              :options="clearOptions"
              :series="clearData"
              width="100%"
              type="bar"
              height="3000"
            />
            <apexchart
              class="flex justify-center"
              v-if="mode === `grade`"
              :options="gradeOptions"
              :series="gradeData"
              width="100%"
              type="bar"
              height="3000"
            />
          </div>
        </ClientOnly>
        <!-- {{ route.param }} -->
        <!-- <div class="grow">
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from "~/types/supabase";
import type { Header } from "vue3-easy-data-table";

const route = useRoute();
const client = useSupabaseClient<Database>();
const user_id =
  typeof route.params.id === "string" ? parseInt(route.params.id, 10) : 0;

const { data: profile } = await useAsyncData("profile", async () => {
  const { data, error } = await client.rpc("get_user_stats", {
    input_user_id: user_id,
  });
  return data;
});

const clear = () => {
  mode.value = "clear";
};

const grade = () => {
  mode.value = "grade";
};

const mode = ref("clear");

// const { data: musics } = await useAsyncData("musics", async () => {
//   const { data } = await client.from("song_play_count").select();

//   return data;
// });

// const levelLists = computed(() => {
//   if (musics.value) return musics.value.map((item) => item.level);
// });

// const playedLists = computed(() => {
//   if (musics.value) return musics.value.map((item) => item.played);
// });

// const clearedLists = computed(() => {
//   if (musics.value) return musics.value.map((item) => item.clears);
// });

// const failedLists = computed(() => {
//   if (musics.value) return musics.value.map((item) => item.fails);
// });

const clearData = computed(() => {
  if (!profile.value) {
    return null;
  }
  return [
    {
      name: "Clear",
      data: profile.value.map((item) => {
        return item.clear_count;
      }),
    },
    {
      name: "Failed",
      data: profile.value.map((item) => {
        return item.fail_count;
      }),
    },
    {
      name: "No Play",
      data: profile.value.map((item) => {
        return item.no_play_count;
      }),
    },
  ];
});

const gradeData = computed(() => {
  if (!profile.value) {
    return null;
  }
  return [
    {
      name: "P Rank",
      data: profile.value.map((item) => {
        return item.grade_p;
      }),
    },
    {
      name: "SS Rank",
      data: profile.value.map((item) => {
        return item.grade_ss;
      }),
    },
    {
      name: "S Rank",
      data: profile.value.map((item) => {
        return item.grade_s;
      }),
    },
    {
      name: "A Rank",
      data: profile.value.map((item) => {
        return item.grade_a;
      }),
    },
    {
      name: "B Rank",
      data: profile.value.map((item) => {
        return item.grade_b;
      }),
    },
    {
      name: "C Rank",
      data: profile.value.map((item) => {
        return item.grade_c;
      }),
    },
    {
      name: "D Rank",
      data: profile.value.map((item) => {
        return item.grade_d;
      }),
    },
    {
      name: "F Rank",
      data: profile.value.map((item) => {
        return item.grade_f;
      }),
    },
    {
      name: "No Play",
      data: profile.value.map((item) => {
        return item.no_play_count;
      }),
    },
  ];
});

//   if (mode.value === "clear") {
//     return profile.value.map((item) => ({
//       name: `Level ${item.level}`,
//       data: [item.clear_count, item.fail_count],
//     }));
//   } else if (mode.value === "grade") {
//     return profile.value.map((item) => ({
//       name: `Level ${item.level}`,
//       data: [
//         item.grade_p,
//         item.grade_ss,
//         item.grade_s,
//         item.grade_a,
//         item.grade_b,
//         item.grade_c,
//         item.grade_d,
//         item.grade_f,
//       ],
//     }));
//   }
// });

const clearOptions = {
  colors: ["#32CD32", "#FF0000", "#D3D3D3"],
  chart: {
    stacked: true,
    stackType: "100%",
    animations: {
      enabled: false,
      dynamicAnimation: {
        enabled: false,
      },
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: profile.value
      ? profile.value.map((item) => `Level ${item.level}`)
      : [],
  },
  yaxis: {
    title: {
      text: "Levels",
    },
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "dark",
  },
};

const gradeOptions = {
  colors: [
    "#FFE21F", //P
    "#FF851B", //SS
    "#2ECC40", //S
    "#D9E778", //A
    "#A291FB", //B
    "#E879F9", //C
    "#FF665B", //D
    "#FF0000", //F
    "#D3D3D3", //NO PLAY
  ],
  chart: {
    stacked: true,
    stackType: "100%",
    animations: {
      enabled: false,
      dynamicAnimation: {
        enabled: false,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  xaxis: {
    categories: profile.value
      ? profile.value.map((item) => `Level ${item.level}`)
      : [],
  },
  yaxis: {
    type: "numeric",
    title: {
      text: "Levels",
    },
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "dark",
  },
};

// const chartOptions = {
//   colors: ["#FF0000", "#32CD32"],
//   chart: {
//     type: "bar",
//     zoom: {
//       enabled: true,
//     },
//     stacked: true,
//   },
//   //   plotOptions: {
//   //     bar: {
//   //       dataLabels: {
//   //         total: {
//   //           enabled: true,
//   //           offsetX: 0,
//   //           style: {
//   //             fontSize: "13px",
//   //             fontWeight: 700,
//   //             color: "#FFFFFF",
//   //           },
//   //         },
//   //       },
//   //     },
//   //   },
//   dataLabels: {
//     enabled: false,
//   },
//   yaxis: {
//     title: {
//       text: "Unique Play (Count)",
//     },
//   },
//   xaxis: {
//     type: "categories",
//     categories: levelLists.value,
//     tickPlacement: "on",
//     tickAmount: 40,
//     decimalsInFloat: 0,
//     title: {
//       text: "Level of Charts",
//       offsetY: -10,
//     },
//   },
//   title: {
//     text: "Unique Play Counts Per Level Charts",
//   },
//   legend: {
//     position: "right",
//     offsetY: 40,
//   },
//   theme: {
//     mode: "dark",
//   },
// };

// const series = [
//   {
//     name: "Failed",
//     data: failedLists.value,
//   },
//   {
//     name: "Cleared",
//     data: clearedLists.value,
//   },
// ];

// const headers: Header[] = [
//   { text: "Level", value: "level", sortable: true },
//   { text: "Total", value: "played", sortable: true },
//   { text: "Cleared", value: "clears", sortable: true },
//   { text: "Failed", value: "fails", sortable: true },
// ];
</script>
