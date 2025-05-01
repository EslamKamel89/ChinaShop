<script setup lang="ts">
const { state: cartItems } = useCart();
</script>
<template>
  <div>
    <h2 class="font-bold text-xl">Shopping Cart</h2>
    <div>
      <CartProductCard
        v-for="product in cartItems.items"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
