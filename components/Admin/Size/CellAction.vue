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
import type { Size } from "./column";
const props = defineProps<{
  size: Size;
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
const deleteSize = async () => {
  try {
    toggleLoading(true);
    const res = await $fetch(`/api/admin/sizes/${props.size.id}`, {
      method: "DELETE",
    });
    if (res) {
      showMessage({ title: "Size Deleted" });
      refreshNuxtData("sizes");
      await navigateTo("/admin/sizes");
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
      <DropdownMenuItem @click="copy(size.id)">
        <Copy /> Copy Size ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="default">
        <NuxtLink
          :to="`/admin/sizes/${props.size.id}`"
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
    @on-confirm="deleteSize"
  ></SharedAlertModal>
</template>
