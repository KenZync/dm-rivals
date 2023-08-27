<template>
  <div class="container mx-auto text-white">
    <div class="flex flex-col justify-center items-center">
      <div class="pt-4">Lv.{{ user?.clear }} {{ user?.nickname }} <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{{ user?.tier }}</span></div>
      <div class="space-x-4">
        <span>Mode: {{ mode }}</span>

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
            <apexchart
              class="flex justify-center"
              v-if="mode === `Clear`"
              :options="clearOptions"
              :series="clearData"
              width="100%"
              type="bar"
              height="3000"
            />
            <apexchart
              class="flex justify-center"
              v-if="mode === `Grade`"
              :options="gradeOptions"
              :series="gradeData"
              width="100%"
              type="bar"
              height="3000"
            />
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from "~/types/supabase";

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

const { data: user } = await useAsyncData("user", async () => {
  const { data, error } = await client.from('users').select("*").eq('user_id',user_id).single();
  return data;
});

const clear = () => {
  mode.value = "Clear";
};

const grade = () => {
  mode.value = "Grade";
};

const mode = ref("Clear");

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
  tooltip: {
    // custom: function({series, seriesIndex, dataPointIndex, w}: any) {
    //   return '<div class="bg-black p-5">' +
    //     '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
    //     '</div>'
    // }
    // custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
    //   return seriesIndex
    // let title = w.globals.tooltip.tooltipTitle.outerHTML;
    // let items = "";
    // w.globals.tooltip.ttItems.forEach((x) => {
    //   items = items + x.outerHTML;
    // });
    // return title + items + "ASDF";
    // },
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
</script>
