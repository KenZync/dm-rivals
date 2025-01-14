<template>
  <Sidebar v-if="route.name != `nsjam-members-player`">
    <slot />
  </Sidebar>
  <div v-else class="min-h-screen bg-zinc-900">
    <slot />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "DM Rivals",
  meta: [{ name: "description", content: "O2Jam score comparison" }],
});
const route = useRoute();
</script>
