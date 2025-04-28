<script setup lang="ts">
import { type Image, type Product } from "@prisma/client";
import { Scan } from "lucide-vue-next";
defineProps<{
  product: Product & { images: Image[] };
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline">
                <Scan />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <img
        :src="`${baseUrl()}/products/${product.images[0].url}`"
        alt="product image"
        class="w-full h-36 flex items- min-w-30 rounded-lg bg-gray-300"
      />
    </div>
    <div class="space-y-2">
      <div class="font-bold">{{ product.name }}</div>
    </div>
  </div>
</template>
