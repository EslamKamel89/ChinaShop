<script setup lang="ts">
import type { Product } from "@prisma/client";
defineProps<{
  product: Product;
  isOpen: boolean;
  toggleModal: (value: boolean) => void;
}>();
</script>

<template>
  <SharedModal
    :is-modal-visible="isOpen"
    :title="product.name"
    @on-close="toggleModal(false)"
    :description="product.price.toString()"
  >
  </SharedModal>
</template>
