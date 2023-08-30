<template>
  <div class="container mx-auto text-white">
    <div class="flex flex-col justify-center items-center">
      <div class="pt-4">
        Lv.{{ user?.clear }} {{ user?.nickname }}
        <span
          class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
          >{{ user?.tier }}</span
        >
      </div>
      <div class="space-x-4">
        <span>Mode: {{ mode }}</span>
        <button
          @click="clear"
          class="mt-4 rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2"
        >
          Clear
        </button>
        <button
          @click="grade"
          class="mt-4 rounded-md border border-gray-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-stone-200 shadow-sm hover:bg-zinc-600 focus:outline-none focus:ring-2"
        >
          Grade
        </button>
      </div>
      <div class="flex w-full pt-4 flex-col md:flex-row">
        <div v-if="status === 'pending'" class="w-full flex justify-center">
          <LoadingSpinner />
        </div>
        <ClientOnly v-else>
          <div class="grow">
            <apexchart
              class="flex justify-center"
              :options="mode == `Clear` ? clearOptions : gradeOptions"
              :series="mode == `Clear` ? clearData : gradeData"
              width="100%"
              type="bar"
              height="3000"
              @click="clickChart"
            />
          </div>
          <template #fallback>
            <LoadingSpinner />
          </template>
        </ClientOnly>
      </div>
    </div>
    <Modal :show="showModal" @cancel="closeModal">
      <template #title
        >{{ clickedData?.title }}
        <span
          class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xl font-medium text-stone-100"
          :class="progressColor(clickedData?.legend)"
          >{{ clickedData?.legend }}</span
        >
      </template>
      <template #description>
        <div class="max-h-96 overflow-auto">
          <div v-for="song in clickedData.desc" class="text-left">
            <NuxtLink
              :to="`https://dmjam.net/music-scoreboard/${song.id}/2`"
              target="_blank"
              >{{ song.title }}</NuxtLink
            >
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { Database } from "~/types/supabase";
import { Grade } from "~/types/enum";

const route = useRoute();
const client = useSupabaseClient<Database>();
const user_id =
  typeof route.params.id === "string" ? parseInt(route.params.id, 10) : 0;

const clickedLevel = ref<number>(0);
const clickedLegends = ref<number>(0);
const showModal = ref(false);
const mode = ref("Clear");

const closeModal = () => {
  showModal.value = false;
};

const clear = () => {
  mode.value = "Clear";
};

const grade = () => {
  mode.value = "Grade";
};

const { data: test, status: status } = useFetch<PlayerPerformancesByLevel>(
  "/api/user/" + user_id
);

const { data: user } = await useAsyncData("user", async () => {
  const { data, error } = await client
    .from("users")
    .select("*")
    .eq("user_id", user_id)
    .single();
  return data;
});

useHead({
  title: `${user.value?.nickname}` + " · player info | DMJam Rival System",
  meta: [
    {
      name: "description",
      content:
        "DMJam Rival System » player info » " + `${user.value?.nickname}`,
    },
  ],
});

const clickChart = (event: MouseEvent, chartContext: any, config: any) => {
  clickedLevel.value = config.dataPointIndex;
  clickedLegends.value = config.seriesIndex;
  if (
    test.value &&
    clearData.value &&
    gradeData.value &&
    config.dataPointIndex > -1
  ) {
    showModal.value = true;
  }
};

const clickedData = computed(() => {
  let title;
  let legend: string = "";
  let desc;
  if (
    test.value &&
    clearData.value &&
    gradeData.value &&
    clickedLevel.value > -1 &&
    typeof clickedLevel.value === "number"
  ) {
    const level = parseInt(levelIndex.value[clickedLevel.value], 10);
    title = levelData.value[clickedLevel.value] + " ";
    if (mode.value == "Clear") {
      legend = clearData.value[clickedLegends.value].name;
      switch (clearData.value[clickedLegends.value].name) {
        case "Cleared":
          desc = test.value[level].clear_songs.sort((a, b) => a.id - b.id);
          break;
        case "Failed":
          desc = test.value[level].fail_songs.sort((a, b) => a.id - b.id);
          break;
        case "No Play":
          desc = test.value[level].no_play_songs.sort((a, b) => a.id - b.id);
          break;
      }
    } else {
      legend = gradeData.value[clickedLegends.value].name;
      switch (gradeData.value[clickedLegends.value].name) {
        case "P Rank":
          desc = test.value[level].grades[Grade.P].songs.sort(
            (a, b) => a.id - b.id
          );
          break;
        case "SS Rank":
          desc = test.value[level].grades[Grade.SS].songs.sort(
            (a, b) => a.id - b.id
          );
          break;
        case "S Rank":
          desc = test.value[level].grades[Grade.S].songs.sort(
            (a, b) => a.id - b.id
          );
          break;
        case "A Rank":
          desc = test.value[level].grades[Grade.A].songs.sort(
            (a, b) => a.id - b.id
          );
          break;
        case "B Rank":
          desc = test.value[level].grades[Grade.B].songs.sort(
            (a, b) => a.id - b.id
          );
          break;
        case "C Rank":
          desc = test.value[level].grades[Grade.C].songs.sort(
            (a, b) => a.id - b.id
          );
          break;
        case "D Rank":
          desc = test.value[level].grades[Grade.D].songs.sort(
            (a, b) => a.id - b.id
          );
          break;
        case "F Rank":
          desc = test.value[level].grades[Grade.F].songs.sort(
            (a, b) => a.id - b.id
          );
          break;
        case "No Play":
          desc = test.value[level].no_play_songs.sort((a, b) => a.id - b.id);
          break;
      }
    }
  }
  return { title, legend, desc };
});

const clearData = computed(() => {
  if (test.value) {
    return [
      {
        name: "Cleared",
        data: Object.entries(test.value).map(([_, performance]) => {
          return performance.clear_count;
        }),
      },
      {
        name: "Failed",
        data: Object.entries(test.value).map(([_, performance]) => {
          return performance.fail_count;
        }),
      },
      {
        name: "No Play",
        data: Object.entries(test.value).map(([_, performance]) => {
          return performance.no_play_count;
        }),
      },
    ];
  }
});

const levelIndex = computed(() => {
  if (test.value) {
    return Object.entries(test.value).map(([level, _]) => {
      return level;
    });
  } else {
    return [];
  }
});

const levelData = computed(() => {
  if (test.value) {
    return Object.entries(test.value).map(([level, _]) => {
      return `Level ${level}`;
    });
  } else {
    return [];
  }
});

const gradeData = computed(() => {
  if (test.value) {
    return [
      {
        name: "P Rank",
        data: Object.entries(test.value).map(([_, performance]) => {
          return performance.grades[Grade.P].count;
        }),
      },
      {
        name: "SS Rank",
        data: Object.entries(test.value).map(([_, performance]) => {
          return performance.grades[Grade.SS].count;
        }),
      },
      {
        name: "S Rank",
        data: Object.entries(test.value).map(([_, performance]) => {
          return performance.grades[Grade.S].count;
        }),
      },
      {
        name: "A Rank",
        data: Object.entries(test.value).map(([_, performance]) => {
          return performance.grades[Grade.A].count;
        }),
      },
      {
        name: "B Rank",
        data: Object.entries(test.value).map(([_, performance]) => {
          return performance.grades[Grade.B].count;
        }),
      },
      {
        name: "C Rank",
        data: Object.entries(test.value).map(([_, performance]) => {
          return performance.grades[Grade.C].count;
        }),
      },
      {
        name: "D Rank",
        data: Object.entries(test.value).map(([_, performance]) => {
          return performance.grades[Grade.D].count;
        }),
      },
      {
        name: "F Rank",
        data: Object.entries(test.value).map(([_, performance]) => {
          return performance.grades[Grade.F].count;
        }),
      },
      {
        name: "No Play",
        data: Object.entries(test.value).map(([_, performance]) => {
          return performance.no_play_count;
        }),
      },
    ];
  }
});

const clearOptions = computed(() => {
  return {
    colors: ["#32CD32", "#FF0000", "#FFFFFF"],
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
      categories: test.value
        ? Object.entries(test.value).map(([level, _]) => {
            return `Level ${level}`;
          })
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
});

const gradeOptions = computed(() => {
  return {
    colors: [
      "#FFE21F", //P
      "#FF851B", //SS
      "#2ECC40", //S
      "#D9E778", //A
      "#A291FB", //B
      "#E879F9", //C
      "#FF665B", //D
      "#D3D3D3", //F
      "#FFFFFF", //NO PLAY
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
      categories: test.value
        ? Object.entries(test.value).map(([level, _]) => {
            return `Level ${level}`;
          })
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
});
</script>
