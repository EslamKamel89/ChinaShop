<template>
  <div class="flex items-center justify-between">
    <Heading title="Categories" description="Manage Categories">
      <template #action>
        <NuxtLink to="/admin/categories/1">
          <Button>
            <Icon name="lucide:plus" />
            <span>Add New</span>
          </Button>
        </NuxtLink>
      </template>
    </Heading>
  </div>
</template>

<script setup lang="ts">
import Heading from "~/components/ui/Heading.vue";
</script>
