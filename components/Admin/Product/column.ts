import CallAction from "@/components/Admin/Product/CellAction.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  isFeatured: boolean;
  isArchived: boolean;
  sizeId: string;
  colorId: string;
  createdAt: string;
}
export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: () => h("div", { class: "text-right font-bold" }, "Name"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right font-medium" },
        row.getValue("name")
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: () => h("div", { class: "text-right font-bold" }, "Created At"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right font-medium" },
        row.getValue("createdAt")
      );
    },
  },
  {
    id: "actions",
    // accessorKey: "actions",
    // header: () => h("div", { class: "text-right" }, "Actions"),
    cell: ({ row }) => {
      const product = row.original;
      return h("div", { class: "relative" }, h(CallAction, { product }));
    },
  },
];
