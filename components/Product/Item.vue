<script setup lang="ts">
import { type Product } from "@prisma/client";
defineProps<{
  product: Product;
}>();
</script>
<template>
  <div class="text-black">
    <pre>
      {{ product }}
    </pre>
  </div>
</template>
