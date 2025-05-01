<script setup lang="ts">
import type { Category, Color, Image, Product, Size } from "@prisma/client";
import { Scan } from "lucide-vue-next";
const props = defineProps<{
  product: Product & {
    images: Image[];
    color: Color;
    size: Size;
    category: Category;
  };
}>();
const { isOpen, selectedProduct, toggleModal, setSelectedProduct } =
  usePreviewModal();
</script>
<template>
  <div>
    <div
      class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 relative"
    >
      <div class="absolute right-0 top-0">
        <Button
          class="cursor-pointer"
          @click="toggleModal(!isOpen)"
          title="Show Product Preview"
        >
          <Scan />
        </Button>
        <ProductModal
          :is-open="isOpen"
          :toggle-modal="toggleModal"
          :product="product"
        />
      </div>
      <img
        class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        :src="`${baseUrl()}/products/${product.images[0].url}`"
        alt=""
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ product.name }}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{
            `${product.category.name} | ${product.color.name} | ${product.size.name}`
          }}
        </p>
      </div>
    </div>
  </div>
</template>
