<script setup lang="ts">
defineProps<{
  to?: string;
  title: string;
  type?: "button" | "link";
  click?: () => void;
}>();
const emit = defineEmits<{
  hideMenu: [];
}>();
const handleHideMenu = async () => {
  await sleep(1000);
  emit("hideMenu");
};
</script>
<template>
  <li @click="handleHideMenu">
    <button
      v-if="type == 'button'"
      @click="click"
      class="block py-2 px-3 text-white md:text-black bg-blue-700 rounded-sm md:bg-transparent md:p-0 cursor-pointer"
      aria-current="page"
    >
      {{ title }}
    </button>
    <NuxtLink
      v-else
      :to="to"
      class="block py-2 px-3 text-white md:text-black rounded-sm md:bg-transparent md:p-0 cursor-pointer md:hover:text-blue-700"
      active-class="!bg-blue-600 md:!bg-white md:!text-blue-700 md:!dark:text-blue-500 dark:!bg-blue-600 md:dark:!bg-transparent"
      aria-current="page"
      >{{ title }}</NuxtLink
    >
  </li>
</template>
