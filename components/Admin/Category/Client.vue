<template>
  <div>
    <div class="flex items-center justify-between">
      <Heading title="Categories" description="Manage Categories">
        <template #action>
          <NuxtLink to="/admin/categories/new">
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
      :data="categories ?? []"
      column-to-search="name"
      search-placeholder="Search by category name"
    />
  </div>
</template>

<script setup lang="ts">
import { columns } from "@/components/Admin/Category/column";
import Heading from "~/components/ui/Heading.vue";
const { data: categories, status } = await useFetch("/api/admin/categories", {
  key: "categories",
  transform: (categories) => {
    return categories.map((category) => ({
      ...category,
      createdAt: formatDateInTable(category.createdAt),
    }));
  },
});
</script>
