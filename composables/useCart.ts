import type { Category, Color, Image, Product, Size } from "@prisma/client";
import { useStorage } from "@vueuse/core";
interface CartState {
  items: (Product & {
    images: Image[];
    color: Color;
    size: Size;
    category: Category;
  })[];
}
const state = useStorage<CartState>("cartItems", { items: [] });
const { showMessage } = useStore();
export default function useCart() {
  const addItem = (
    item: Product & {
      images: Image[];
      color: Color;
      size: Size;
      category: Category;
    }
  ) => {
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
  };
  return { state, addItem, removeItem, isInCart, emptyCart };
}
