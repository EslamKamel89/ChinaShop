<script setup lang="ts">
import { ShieldUser, UserCheck } from "lucide-vue-next";

defineProps<{
  links: { to: string; title: string }[];
}>();
const session = useUserSession();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button
        class="block py-2 px-3 text-white md:text-black bg-blue-700 rounded-sm md:bg-transparent md:p-0 cursor-pointer text-left w-fit"
      >
        <UserCheck v-if="session.user.value" />
        <ShieldUser v-else />
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-56 bg-blue-600 md:bg-white mx-4">
      <template v-if="session.user.value">
        <DropdownMenuLabel>{{ session.user.value?.name }}</DropdownMenuLabel>
        <DropdownMenuLabel class="text-xs text-gray-600 !mt-0 !pt-0">{{
          session.user.value?.email
        }}</DropdownMenuLabel>
        <DropdownMenuSeparator />
      </template>
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
