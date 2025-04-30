<script setup lang="ts">
const { products, status: productStatus, execute } = await useFetchProducts();
const { data: cachedCategories } = useNuxtData("categories");
const { data: categories, status: categoryStatus } = await useFetch(
  "/api/admin/categories",
  {
    key: "categories",
    transform: (categories) => {
      return categories.map((category) => ({
        ...category,
        createdAt: new Date(category.createdAt),
        updatedAt: new Date(category.updatedAt),
      }));
    },
    default: () => cachedCategories.value,
  }
);
const { data: cachedColors } = useNuxtData("colors");
const { data: colors, status: colorStatus } = await useFetch(
  "/api/admin/colors",
  {
    key: "colors",
    transform: (colors) => {
      return colors.map((color) => ({
        ...color,
        createdAt: new Date(color.createdAt),
        updatedAt: new Date(color.updatedAt),
      }));
    },
    default: () => cachedColors.value,
  }
);
const { data: cachedSizes } = useNuxtData("size");
const { data: sizes, status: sizeStatus } = await useFetch("/api/admin/sizes", {
  key: "sizes",
  transform: (sizes) => {
    return sizes.map((size) => ({
      ...size,
      createdAt: new Date(size.createdAt),
      updatedAt: new Date(size.updatedAt),
    }));
  },
  default: () => cachedSizes.value,
});
const { showError } = useStore();
onMounted(() => {
  execute();
});
</script>
<template>
  <div class="flex flex-col sm:grid sm:grid-cols-12 w-full gap-5">
    <!--Mobile Filter-->
    <div class="block sm:hidden text-center p-4 w-full mx-auto">
      <div class="flex w-full justify-end">
        <ProductMobileFilter
          :colors="colors ?? []"
          :categories="categories ?? []"
          :sizes="sizes ?? []"
        />
      </div>
    </div>
    <div class="hidden sm:block col-span-4 text-center p-4">
      <div class="border rounded-lg min-h-72">
        <ProductFilter
          value-key="categoryId"
          :data="categories ?? []"
          name="Categories"
        />
        <ProductFilter value-key="sizeId" :data="sizes ?? []" name="Sizes" />
        <ProductFilter value-key="colorId" :data="colors ?? []" name="Colors" />
      </div>
    </div>
    <div class="col-span-8">
      <div class="py-4">
        <div class="flex flex-col space-y-8">
          <ProductItemLoader
            v-if="productStatus == 'pending'"
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
