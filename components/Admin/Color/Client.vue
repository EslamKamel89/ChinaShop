<template>
  <div>
    <div class="flex items-center justify-between">
      <Heading title="Colors" description="Manage Colors">
        <template #action>
          <NuxtLink to="/admin/colors/new">
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
      :data="colors ?? []"
      column-to-search="name"
      search-placeholder="Search by color name"
    />
  </div>
</template>

<script setup lang="ts">
import { columns } from "@/components/Admin/Color/column";
import Heading from "~/components/ui/Heading.vue";

const { data: colors, status } = await useFetch("/api/admin/colors", {
  key: "colors",
  transform: (colors) => {
    return colors.map((color) => ({
      ...color,
      createdAt: formatDateInTable(color.createdAt),
    }));
  },
});
</script>
