export default async function useFetchProducts() {
  const {
    data: products,
    status,
    execute,
  } = await useFetch("/api/admin/products", {
    key: "products",
    transform: (products) => {
      return products.map((product) => ({
        ...product,
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt),
        images: [
          ...product.images.map((img) => ({
            ...img,
            createdAt: new Date(img.createdAt),
            updatedAt: new Date(img.updatedAt),
          })),
        ],
        category: {
          ...product.category,
          createdAt: new Date(product.category.createdAt),
          updatedAt: new Date(product.category.updatedAt),
        },
      }));
    },
    lazy: true,
    immediate: false,
  });
  return {
    products,
    status,
    execute,
  };
}
