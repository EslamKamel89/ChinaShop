<script setup lang="ts">
const { state: cartItems, emptyCart } = useCart();
const { showMessage } = useStore();
const totalPrice = computed(() => {
  return cartItems.value.items.reduce(
    (sum: number, current) => sum + current.price,
    0
  );
});
const onCheckout = async () => {
  const itemsIds = cartItems.value.items.map((i) => i.id);
  pr(itemsIds, "itemsIds");
  const data = await $fetch("/api/checkout", {
    method: "POST",
    body: { ids: itemsIds },
  });
  pr(data, "onChekcout response");
  if (data && data.sessionURL) {
    emptyCart();
    showMessage({
      title: "Your Order is placed successfully",
    });
    window.location.href = data.sessionURL;
  } else {
    showMessage({
      title: "Sorry, unknown error occured",
    });
  }
};
</script>
<template>
  <div
    class="flex flex-col space-y-2 h-fit px-4 py-2 items-center md:max-w-xl bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
  >
    <h2 lass="font-bold text-xl mb-4 tracking-tighter">Order Summary</h2>
    <p>Total Price: EGP {{ totalPrice }}</p>
    <Button class="w-full" type="button" @click="onCheckout">Checkout</Button>
  </div>
</template>
