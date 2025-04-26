<template>
  <div>
    <div class="flex items-center justify-between">
      <Heading title="Products" description="Manage Products">
        <template #action>
          <NuxtLink to="/admin/products/new">
            <Button>
              <Icon name="lucide:plus" />
              <span>Add New</span>
            </Button>
          </NuxtLink>
        </template>
      </Heading>
    </div>
    <DataTable
      v-if="status == 'success'"
      :columns="columns"
      :data="products ?? []"
      column-to-search="name"
      search-placeholder="Search by product name"
    />
  </div>
</template>

<script setup lang="ts">
import { columns } from "@/components/Admin/Product/column";
import Heading from "~/components/ui/Heading.vue";
import { money } from "~/server/utils";
const { data: products, status } = await useFetch("/api/admin/products", {
  key: "products",
  transform: (products) => {
    return products.map((product) => ({
      ...product,
      price: money(product.price),
      size: product.size.name,
      // color: product.color.name,
      category: product.category.name,
      createdAt: formatDateInTable(product.createdAt),
    }));
  },
});
</script>
