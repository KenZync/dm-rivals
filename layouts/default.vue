<template>
  <Sidebar>
    <slot />
  </Sidebar>
</template>

<script setup lang="ts">
useHead({
  title: "DM Rivals",
  meta: [{ name: "description", content: "O2Jam score comparison" }],
});
</script>
