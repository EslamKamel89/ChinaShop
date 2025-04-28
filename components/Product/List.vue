<script setup lang="ts">
import { type Product } from "@prisma/client";
defineProps<{
  products: Product[];
  title: string;
}>();
</script>
<template>
  <div>
    <h2>{{ title }}</h2>
    <div
      v-if="products.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
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
