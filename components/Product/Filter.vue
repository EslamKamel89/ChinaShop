<script setup lang="ts">
import type { Category, Color, Size } from "@prisma/client";
const props = defineProps<{
  data: Color[] | Size[] | Category[];
  name: string;
  valueKey: string;
}>();
const route = useRoute();
const router = useRouter();
const onClick = (id: string) => {
  const query = new URLSearchParams(
    route.query as { categoryId: string; colorId: string; sizeId: string }
  );
  if (query.get(props.valueKey) == id) {
    query.delete(props.valueKey);
  } else {
    query.set(props.valueKey, id);
  }
  router.push({
    path: route.path,
    query: Object.fromEntries(query.entries()),
  });
};
</script>
<template>
  <div class="mb-8">
    <div class="text-lg font-semibold">{{ name }}</div>
    <hr class="my-2" />
    <div class="flex flex-wrap gap-2 self-stretch">
      <Badge
        v-for="(filter, i) in data"
        :key="filter.id"
        :variant="route.query[valueKey] == filter.id ? 'default' : 'outline'"
        @click="onClick(filter.id)"
        class="cursor-pointer px-2 py-1 font-medium"
        >{{ filter.name }}</Badge
      >
    </div>
  </div>
</template>
