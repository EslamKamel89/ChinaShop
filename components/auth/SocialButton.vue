<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
}>();
</script>
<template>
  <Button variant="outline" class="w-full">
    <Icon :name="icon" style="color: black" /> {{ title }}
  </Button>
</template>
