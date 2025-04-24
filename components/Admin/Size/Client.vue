<template>
  <div>
    <div class="flex items-center justify-between">
      <Heading title="Sizes" description="Manage Sizes">
        <template #action>
          <NuxtLink to="/admin/sizes/new">
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
      :data="sizes ?? []"
      column-to-search="name"
      search-placeholder="Search by size name"
    />
  </div>
</template>

<script setup lang="ts">
import { columns } from "@/components/Admin/Size/column";
import Heading from "~/components/ui/Heading.vue";

const { data: sizes, status } = await useFetch("/api/admin/sizes", {
  key: "sizes",
  transform: (sizes) => {
    return sizes.map((size) => ({
      ...size,
      createdAt: formatDateInTable(size.createdAt),
    }));
  },
});
</script>
