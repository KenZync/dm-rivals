<template>
  <div v-if="otherInterpolatedMouses">
    <!-- {{ userId }}|{{ x }}|{{ y }} {{ otherMouses }} {{ userList }} | {{ userList.length}} Players Online -->
    <div>You are : {{ userId }}</div>
	<div>Your Coordination : {{ x }},{{ y }}</div>
    <div>{{ userList.length }} Player(s) Online :
    {{ userList }}</div>
    <div>Other Mouses:{{ otherMouses }}</div>
	<div>Other Mouses (Interpolated):{{ otherInterpolatedMouses }}</div>
    <div v-for="(mouse, index) in otherInterpolatedMouses">
      <div
        class="absolute select-none h-8 w-8 -ml-4 -mt-4 border-2 border-black rounded-full"
        :style="{
          left: mouse.x + 'px',
          top: mouse.y + 'px',
          background: '#' + index,
        }"
      >
        <div class="-mt-8 -ml-14 w-32 text-center">User : {{ index }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from "~/types/supabase";

definePageMeta({
  layout: "empty",
});

const client = useSupabaseClient<Database>();
const channel = client.channel("room_1");
const userId = ref();

const MOUSE_EVENT = "cursor";
const TYPE = "broadcast";
const PRESENCE = "presence";

const userList = ref<String[]>([]);

onMounted(() => {
  userId.value = Math.floor(Math.random() * 16777215).toString(16);
  channel
    .on(TYPE, { event: MOUSE_EVENT }, ({ payload }) => {
      receivedCursorPosition(payload);
    })
    .on(PRESENCE, { event: "sync" }, () => {
      const newState = channel.presenceState();
      console.log("sync", newState);

      /** transform the presence */
      const sync = Object.keys(newState)
        .map((presenceId) => {
          const presences = newState[presenceId] as unknown as {
            user: string;
            online_at: Date;
          }[];
          return presences.map((presence) => presence.user);
        })
        .flat();
      userList.value = sync;
      for (const searchId in otherMouses.value) {
        if (!userList.value.includes(searchId)) {
          delete otherMouses.value[searchId];
        }
      }
    })
    .on(PRESENCE, { event: "join" }, ({ key, newPresences }) => {
      console.log("join", key, newPresences);
    })
    .on(PRESENCE, { event: "leave" }, ({ key, leftPresences }) => {
      console.log("leave", key, leftPresences);
    })
    .subscribe(async (status, err) => {
      if (status === "SUBSCRIBED") {
        console.log("Connected!");
        const presenceTrackStatus = await channel.track({
          user: userId.value,
          online_at: new Date().toISOString(),
        });
      }

      if (status === "CHANNEL_ERROR") {
        console.log(`There was an error subscribing to channel: ${err}`);
      }

      if (status === "TIMED_OUT") {
        console.log("Realtime server did not respond in time.");
      }

      if (status === "CLOSED") {
        console.log("Realtime channel was unexpectedly closed.");
      }
    });
});

const otherMouses = ref<{ [userId: string]: { x: number; y: number } }>({});
const otherInterpolatedMouses = ref<{
  [userId: string]: { x: number; y: number };
}>({});
const interpolationFactor = 0.1;
const receivedCursorPosition = (payload: {
  userId: string;
  x: number;
  y: number;
}) => {
  otherMouses.value[payload.userId] = { x: payload.x, y: payload.y };
};

const interpolateMouses = () => {
  for (const userId in otherMouses.value) {
    const targetPosition = otherMouses.value[userId];
    if (!otherInterpolatedMouses.value[userId]) {
      otherInterpolatedMouses.value[userId] = { ...targetPosition };
    } else {
      const interpolatedPosition = otherInterpolatedMouses.value[userId];
      interpolatedPosition.x +=
        (targetPosition.x - interpolatedPosition.x) * interpolationFactor;
      interpolatedPosition.y +=
        (targetPosition.y - interpolatedPosition.y) * interpolationFactor;
    }
  }
  for (const searchId in otherInterpolatedMouses.value) {
        if (!userList.value.includes(searchId)) {
          delete otherInterpolatedMouses.value[searchId];
        }
      }
};

// Start the interpolation loop with useInterval
useIntervalFn(interpolateMouses, 10); // Call interpolateMouses every 16.67 ms

const { x, y, sourceType } = useMouse();

watch([x, y], ([newX, newY]) => {
  const position: Position = {
    userId: userId.value,
    x: newX,
    y: newY,
  };
  sendMousePosition(position);
});

const sendMousePosition = async (payload: Position) => {
  return await channel.send({
    type: TYPE,
    event: MOUSE_EVENT,
    payload,
  });
};

interface Position {
  userId: string;
  x: number;
  y: number;
}
</script>

<style scoped></style>
