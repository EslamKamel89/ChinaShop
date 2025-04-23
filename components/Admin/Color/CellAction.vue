<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-vue-next";
import handleApiError from "~/utils/error";
import type { Color } from "./column";
const props = defineProps<{
  color: Color;
}>();
const { showMessage, toggleLoading, toggleModal, isModalVisible } = useStore();

function copy(id: string) {
  navigator.clipboard.writeText(id);
  showMessage({
    title: "Copied!",
    description: `ID:${id} is copied successfully`,
    variant: "default",
  });
}
const deleteColor = async () => {
  try {
    toggleLoading(true);
    const res = await $fetch(`/api/admin/colors/${props.color.id}`, {
      method: "DELETE",
    });
    if (res) {
      showMessage({ title: "Color Deleted" });
      refreshNuxtData("colors");
      await navigateTo("/admin/colors");
    }
  } catch (error) {
    const err = handleApiError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(color.id)">
        <Copy /> Copy Color ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="default">
        <NuxtLink
          :to="`/admin/colors/${props.color.id}`"
          class="flex gap-x-3 items-center"
        >
          <Pencil /> <span>Edit</span>
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem @click="toggleModal(true)" variant="destructive">
        <Trash2 /> Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <SharedAlertModal
    v-if="isModalVisible"
    :is-modal-visible="isModalVisible"
    @on-confirm="deleteColor"
  ></SharedAlertModal>
</template>
