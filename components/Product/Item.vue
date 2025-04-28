<script setup lang="ts">
import type { Category, Image, Product } from "@prisma/client";
import { Scan } from "lucide-vue-next";
defineProps<{
  product: Product & { images: Image[]; category: Category };
}>();
</script>
<template>
  <div
    class="flex flex-col justify-center rounded-lg border px-2 py-1 items-center space-y-4"
  >
    <div class="relative">
      <div
        class="absolute bg-red-500 px-2 py-1 rounded text-white text-xs"
        v-if="product.isFeatured"
      >
        Featured
      </div>
      <div class="absolute right-0 top-0">
        <SharedToolTip>
          <template #trigger>
            <Scan class="" />
          </template>
          <template #content> Show Preview </template>
        </SharedToolTip>
      </div>
      <img
        :src="`${baseUrl()}/products/${product.images[0].url}`"
        alt="product image"
        class="w-full h-36 flex items- min-w-30 rounded-lg bg-gray-300"
      />
    </div>
    <div class="space-y-2 w-full flex flex-col justify-center items-center">
      <div>
        <div class="font-bold">{{ product.name }}</div>
        <div class="font-thin text-sm">{{ product.category.name }}</div>
      </div>
      <div>EGP {{ product.price }}</div>
      <Button class="w-full" variant="outline"> Add To Card</Button>
    </div>
  </div>
</template>
