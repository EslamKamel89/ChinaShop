<script setup lang="ts">
import type { Category, Color, Image, Product } from "@prisma/client";
defineProps<{
  products: (Product & { images: Image[]; category: Category; color: Color })[];
  title: string;
  wrapperClass: string;
}>();
</script>
<template>
  <div>
    <h2 class="font-bold tracking-tight text-lg">{{ title }}</h2>
    <div v-if="products.length" :class="wrapperClass">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    <div v-else>
      <SharedNoResult class="mt-5" />
      <div class="flex w-full justify-center mt-2">
        <NuxtLink to="/products">
          <Button variant="outline">Clear Filters</Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
