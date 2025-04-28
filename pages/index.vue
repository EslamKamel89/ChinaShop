<script setup lang="ts">
const { user, clear } = useUserSession();
definePageMeta({
  // middleware: ["auth"],
});

const { showError } = useStore();
</script>
<template>
  <div>
    <h2>Home page</h2>

    <div>{{ user }}</div>
  </div>
</template>
