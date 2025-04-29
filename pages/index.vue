<script setup lang="ts">
const { user, clear } = useUserSession();
definePageMeta({
  // middleware: ["auth"],
});
const { products, status, execute } = await useFetchProducts();
const { showError } = useStore();
onMounted(() => {
  execute();
});
</script>
<template>
  <div>
    <HomeHero />
    <div class="py-4">
      <div class="flex flex-col space-y-8 px-4 sm:px-6 lg:px-8">
        <ProductItemLoader
          title="Fetaured Products"
          wrapper-class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-8 space-y-8"
          v-if="status == 'pending'"
        />
        <ProductList
          v-else
          :products="products ?? []"
          title="Fetaured Products"
          wrapper-class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-8 space-y-8"
        />
      </div>
    </div>
  </div>
</template>
