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
      images: [
        ...product.images.map((img) => ({
          ...img,
          createdAt: new Date(img.createdAt),
          updatedAt: new Date(img.updatedAt),
        })),
      ],
      category: {
        ...product.category,
        createdAt: new Date(product.category.createdAt),
        updatedAt: new Date(product.category.updatedAt),
      },
    }));
  },
  lazy: true,
});
const { showError } = useStore();
</script>
<template>
  <div>
    <HomeHero />
    <div class="py-4">
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
