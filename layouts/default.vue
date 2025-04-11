<template>
  <div>
    <div>Default layout</div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
onMounted(() => {
  colorMode.preference = "light";
  pr(colorMode.preference, "colorMode.preference");
});
</script>
