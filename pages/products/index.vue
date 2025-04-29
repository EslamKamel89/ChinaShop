<script setup lang="ts">
const { products, status, execute } = await useFetchProducts();
const { showError } = useStore();
onMounted(() => {
  execute();
});
</script>
<template>
  <div class="flex flex-col sm:grid sm:grid-cols-12 w-full gap-5">
    <!--Mobile Filter-->
    <div class="block sm:hidden text-center p-4 w-full mx-auto">
      <div class="border rounded-lg min-h-36 w-full">Mobile Filters</div>
    </div>
    <div class="hidden sm:block col-span-4 text-center p-4">
      <div class="border rounded-lg min-h-72">Filters</div>
    </div>
    <div class="col-span-8">
      <div class="py-4">
        <div class="flex flex-col space-y-8">
          <ProductItemLoader
            v-if="status == 'pending'"
            title="Products"
            wrapper-class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-8 space-y-8"
          />
          <ProductList
            v-else
            :products="products ?? []"
            title="Products"
            wrapper-class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-8 space-y-8"
          />
        </div>
      </div>
    </div>
  </div>
</template>
