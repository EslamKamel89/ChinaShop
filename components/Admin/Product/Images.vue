<script setup lang="ts">
import { Trash } from "lucide-vue-next";

defineProps<{
  images:
    | {
        productId: string;
        id: string;
        url: string;
      }[]
    | null
    | undefined;
}>();
const emit = defineEmits<{
  onDelete: [id: string];
}>();
</script>
<template>
  <template v-if="images?.length">
    <div class="my-4">
      <h3 class="font-bold">Attached Images</h3>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-fit mx-auto"
      >
        <div v-for="img in images" :key="img.id" class="relative">
          <Trash
            @click="emit('onDelete', img.id)"
            class="absolute -top-2 -right-2 bg-white text-red-500 rounded-full px-2 py-1 w-10 h-10 cursor-pointer"
          />
          <img
            :src="`${baseUrl()}/products/${img.url}`"
            :alt="`Product image`"
            class="rounded-lg border w-32"
          />
        </div>
      </div>
    </div>
  </template>
</template>
