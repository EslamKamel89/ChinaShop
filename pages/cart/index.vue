<script setup lang="ts">
const { state: cartItems } = useCart();
const route = useRoute();
const { showMessage } = useStore();
onMounted(() => {
  if (pr(route.query.success, "route.query.success")) {
    setTimeout(() => {
      showMessage({
        title: "Payament completed successfully",
      });
    }, 1000);
  } else if (route.query.canceled) {
    setTimeout(() => {
      showMessage({
        title: "Payment failed",
        variant: "destructive",
      });
    }, 1000);
  }
});
</script>
<template>
  <div>
    <h2 class="font-bold text-2xl mb-4 tracking-tighter">Shopping Cart</h2>
    <div
      v-if="cartItems.items.length"
      class="flex flex-col md:flex-row-reverse space-y-4 md:space-y-0 justify-between"
    >
      <CartCheckout class="md:flex-1 md:ml-4" />
      <div class="flex-col space-y-4">
        <CartProductCard
          v-for="product in cartItems.items"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>

    <div v-else>
      <div class="w-full text-center mt-5">There are no items in the cart</div>
    </div>
  </div>
</template>
