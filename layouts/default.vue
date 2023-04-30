<template>
  <Sidebar>
    <slot />
  </Sidebar>
</template>

<script setup lang="ts">
useHead({
  title: "DMJam Rival System",
  meta: [{ name: "description", content: "O2Jam score comparison" }],
});
</script>
