<script setup lang="ts">
defineProps<{
  title: string;
  links: { to: string; title: string }[];
}>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button
        class="block py-2 px-3 text-white md:text-black bg-blue-700 rounded-sm md:bg-transparent md:p-0 cursor-pointer text-left w-fit"
      >
        {{ title }}
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-56 bg-blue-600 md:bg-white mx-4">
      <DropdownMenuGroup>
        <DropdownMenuItem
          v-for="link in links"
          :key="link.to"
          class="bg-blue-600 hover:!bg-blue-700 md:bg-white md:hover:!bg-white"
        >
          <LayoutNavItem :to="link.to" :title="link.title" />
        </DropdownMenuItem>
        <DropdownMenuItem
          class="bg-blue-600 hover:!bg-blue-700 md:bg-white md:hover:!bg-white"
        >
          <slot />
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
