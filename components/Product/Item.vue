<script setup lang="ts">
import type { Category, Color, Image, Product } from "@prisma/client";
import { Scan, Trash } from "lucide-vue-next";
defineProps<{
  product: Product & { images: Image[]; category: Category; color: Color };
}>();
const { isOpen, selectedProduct, toggleModal, setSelectedProduct } =
  usePreviewModal();
const { state: cartItems, addItem, isInCart, removeItem } = useCart();
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
        <!--
        
        <SharedToolTip>
          <template #trigger>
            <Scan class="" />
          </template>
          <template #content>
            <Button
              variant="ghost"
              class="cursor-pointer"
              @click="toggleModal(!isOpen)"
            >
              Show Preview
            </Button>
            <ProductModal
              :is-open="isOpen"
              :toggle-modal="toggleModal"
              :product="product"
            />
          </template>
        </SharedToolTip>
      -->
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
      <Button
        v-if="!isInCart(product)"
        class="w-full"
        variant="outline"
        @click="addItem(product)"
      >
        Add To Cart</Button
      >
      <Button
        v-else
        class="w-full text-red-400"
        variant="secondary"
        @click="removeItem(product)"
      >
        Remove From Cart <Trash
      /></Button>
    </div>
  </div>
</template>
