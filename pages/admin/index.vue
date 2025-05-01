<script setup lang="ts">
import Heading from "~/components/ui/Heading.vue";
definePageMeta({
  middleware: ["admin"],
});
const { totalRevenue, stockCount, salesCount, graphData } = await $fetch(
  "/api/admin/analytics"
);
</script>
<template>
  <div class="flex flex-col">
    <div class="flex-1 flex flex-col space-y-4 p-8 pt-6">
      <Heading title="Analytics" description="Overview of you data" />
      <Separator />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <AnalyticsStat title="Total Revenue" :value="totalRevenue" />
        <AnalyticsStat title="Stock Count" :value="stockCount" />
        <AnalyticsStat title="Sales Count" :value="salesCount" />
      </div>
      <AnalyticsChart :data="graphData" />
    </div>
  </div>
</template>
