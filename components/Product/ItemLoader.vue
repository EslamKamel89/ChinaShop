<script setup lang="ts">
import Skeleton from "../ui/skeleton/Skeleton.vue";
defineProps<{
  title: string;
}>();
</script>

<template>
  <div>
    <h2 class="font-bold tracking-tight text-lg">{{ title }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        class="flex flex-col justify-center rounded-lg border px-2 py-1 items-center space-y-4"
        v-for="i in 6"
        :key="i"
      >
        <Skeleton class="h-36 w-full rounded-lg bg-gray-300" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[250px] bg-gray-300" />
          <Skeleton class="h-4 w-[200px] bg-gray-300" />
          <Skeleton class="h-4 w-[200px] bg-gray-300" />
          <Skeleton class="h-4 w-[200px] bg-gray-300" />
        </div>
      </div>
    </div>
  </div>
</template>
