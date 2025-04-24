<script setup lang="ts">
const props = defineProps<{
  colorCode: string;
}>();
const { showMessage } = useStore();
const handleCopy = () => {
  navigator.clipboard.writeText(props.colorCode);
  showMessage({
    title: "Copied!",
    description: `Color:${props.colorCode} is copied successfully`,
    variant: "default",
  });
};
</script>
<template>
  <div
    class="flex items-center space-x-2 w-full justify-end cursor-pointer"
    @click="handleCopy"
  >
    <div>{{ colorCode }}</div>
    <div
      class="h-6 w-6 rounded-full border"
      :style="{ backgroundColor: colorCode }"
    ></div>
  </div>
</template>
