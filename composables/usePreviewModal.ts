import type { Product } from "@prisma/client";
export default function usePreviewModal() {
  const selectedProduct = ref<Product | null>(null);
  const isOpen = ref(false);
  const toggleModal = (value: boolean) => {
    isOpen.value = value;
  };
  const setSelectedProduct = (newProduct: Product | null) => {
    selectedProduct.value = newProduct;
  };
  return {
    isOpen,
    selectedProduct,
    toggleModal,
    setSelectedProduct,
  };
}
