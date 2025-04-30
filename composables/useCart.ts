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
        // description: "",
        variant: "destructive",
      });
    } else {
      state.value.items = [...state.value.items, item];
    }
  };
  return { state, addItem };
}
