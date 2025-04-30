<script setup lang="ts">
import type { Category, Color, Size } from "@prisma/client";
const props = defineProps<{
  data: Color[] | Size[] | Category[];
  name: string;
  valueKey: string;
}>();
const route = useRoute();
const { onClick } = useProductFilters(props);
</script>
<template>
  <div class="mb-8">
    <div class="text-lg font-semibold">{{ name }}</div>
    <hr class="my-2" />
    <div class="flex flex-wrap gap-2 self-stretch">
      <Badge
        v-for="(filter, i) in data"
        :key="filter.id"
        :variant="route.query[valueKey] == filter.id ? 'default' : 'outline'"
        @click="onClick(filter.id)"
        class="cursor-pointer px-2 py-1 font-medium"
        >{{ filter.name }}</Badge
      >
    </div>
  </div>
</template>
