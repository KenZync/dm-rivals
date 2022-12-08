<template>
  <div class="flex space-x-2 overflow-auto pt-4">
    <score
      :userID="id1"
      :submitted="submitted1"
      :filtered-compare-data="filteredCompareData1"
      color="blue"
    ></score>
    <score
      :userID="id2"
      :submitted="submitted2"
      :filtered-compare-data="filteredCompareData2"
      color="red"
    ></score>
  </div>
</template>

<script setup>
const props = defineProps({
  id1: String,
  id2: String,
  submitted1: String,
  submitted2: String,
  filteredCompareData1: Object,
  filteredCompareData2: Object,
});
</script>
