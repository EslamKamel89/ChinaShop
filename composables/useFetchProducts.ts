import type { ProductFilters } from "~/types";

export default async function useFetchProducts(
  queryParam: { isFeatured?: boolean } = {}
) {
  const query = ref<ProductFilters>({});
  if (queryParam.isFeatured) {
    query.value.isFeatured = "true";
  }
  const route = useRoute();
  watch(
    () => route.query,
    () => {
      query.value = route.query;
    }
  );
  const {
    data: products,
    status,
    execute,
  } = await useFetch("/api/admin/products", {
    key: "products",
    query: query,
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
        color: {
          ...product.color,
          createdAt: new Date(product.color.createdAt),
          updatedAt: new Date(product.color.updatedAt),
        },
        size: {
          ...product.size,
          createdAt: new Date(product.size.createdAt),
          updatedAt: new Date(product.size.updatedAt),
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
