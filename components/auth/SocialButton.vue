<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
}>();
const authenticate = () => {
  window.location.href = "/api/auth/github";
};
</script>
<template>
  <Button @click="authenticate" variant="outline" class="w-full">
    <Icon :name="icon" style="color: black" /> {{ title }}
  </Button>
</template>
