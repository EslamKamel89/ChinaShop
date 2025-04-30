import type { Product } from "@prisma/client";
import { useStorage } from "@vueuse/core";
interface CartState {
  items: Product[];
}
const state = useStorage<CartState>("cartItems", { items: [] });
const { showMessage } = useStore();
export default function useCart() {
  const addItem = (item: Product) => {
    const existingItem = state.value.items.find((i) => i.id === item.id);
    if (existingItem) {
      showMessage({
        title: "Item Already Exist",
        variant: "destructive",
      });
    } else {
      state.value.items = [...state.value.items, item];
      showMessage({
        title: "Item Added to Cart",
        variant: "default",
      });
    }
  };
  const removeItem = (item: Product) => {
    state.value.items = state.value.items.filter((i) => i.id !== item.id);
    showMessage({
      title: "Item Removed from cart",
      variant: "default",
    });
  };
  const isInCart = (item: Product) => {
    const existingItem = state.value.items.find((i) => i.id === item.id);
    return existingItem ? true : false;
  };
  const emptyCart = () => {
    state.value.items = [];
    showMessage({
      title: "Cart is empty now",
    });
  };
  return { state, addItem, removeItem, isInCart, emptyCart };
}
