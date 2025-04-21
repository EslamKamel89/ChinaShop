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
  </div>
</template>

<script setup lang="ts">
import Heading from "~/components/ui/Heading.vue";
const categories = await $fetch("/api/admin/categories");
</script>
