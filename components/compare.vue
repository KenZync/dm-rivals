<template>
  <div class="flex space-x-2 overflow-auto h-[calc(100vh-260px)]">
    <score
      :userID="id1"
      :rivalID="id2"
      :submitted="submitted1"
      :filtered-compare-data="filteredCompareData1"
      color="blue"
    ></score>
    <score
      :userID="id2"
      :rivalID="id1"
      :submitted="submitted2"
      :filtered-compare-data="filteredCompareData2"
      color="red"
    ></score>
  </div>
</template>

<script setup>
const props = defineProps({
  id1: Number,
  id2: Number,
  submitted1: String,
  submitted2: String,
  filteredCompareData1: Object,
  filteredCompareData2: Object,
});
</script>
