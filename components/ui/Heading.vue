<script setup lang="ts">
interface HeadingProps {
  title: string;
  description: string;
}
defineProps<HeadingProps>();
</script>
<template>
  <div class="flex flex-row items-center w-full justify-between">
    <div class="flex flex-col">
      <div class="text-3xl font-bold tracking-tight">{{ title }}</div>
      <p class="text-sm text-muted-foreground">{{ description }}</p>
    </div>
    <slot name="action" />
  </div>
</template>
