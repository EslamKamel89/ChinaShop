import type { Category, Color, Size } from "@prisma/client";
export default function useProductFilters(props: {
  data: Color[] | Size[] | Category[];
  name: string;
  valueKey: string;
}) {
  const route = useRoute();
  const router = useRouter();
  const onClick = (id: string) => {
    const query = new URLSearchParams(
      route.query as { categoryId: string; colorId: string; sizeId: string }
    );
    if (query.get(props.valueKey) == id) {
      query.delete(props.valueKey);
    } else {
      query.set(props.valueKey, id);
    }
    router.push({
      path: route.path,
      query: Object.fromEntries(query.entries()),
    });
  };
  return { onClick };
}
