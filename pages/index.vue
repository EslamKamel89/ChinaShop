<script setup lang="ts">
const { user, clear } = useUserSession();
definePageMeta({
  // middleware: ["auth"],
});
const {
  data: products,
  status,
  execute,
} = await useFetch("/api/admin/products", {
  key: "products",
  transform: (products) => {
    return products.map((product) => ({
      ...product,
      createdAt: new Date(product.createdAt),
      updatedAt: new Date(product.updatedAt),
    }));
  },
  lazy: true,
});
const { showError } = useStore();
</script>
<template>
  <div>
    <HomeHero />
    <div class="py-16 sm:py-32">
      <div class="flex flex-col space-y-8 px-4 sm:px-6 lg:px-8">
        <ProductItemLoader
          title="Fetaured Products"
          v-if="status == 'pending'"
        />
        <ProductList
          v-else
          :products="products ?? []"
          title="Fetaured Products"
        />
      </div>
    </div>
  </div>
</template>
