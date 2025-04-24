<script setup lang="ts">
definePageMeta({
  middleware: ["admin"],
});
</script>
<template>
  <div class="flex flex-col">
    <div class="flex-1 space-y-4 p-8">
      <AdminProductForm :is-editing="false" />
    </div>
  </div>
</template>
