import CallAction from "@/components/Admin/Product/CellAction.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import Value from "../Color/Value.vue";
// import type {Product} from "@prisma/client";
export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: string;
  isFeatured: boolean;
  isArchived: boolean;
  sizeId: string;
  colorId: string;
  createdAt: string;
  category: string;
  size: string;
  color: { name: string; value: string };
  images: { url: string }[];
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
    accessorKey: "price",
    header: () => h("div", { class: "text-right font-bold" }, "Price"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right font-medium" },
        row.getValue("price")
      );
    },
  },
  {
    accessorKey: "category",
    header: () => h("div", { class: "text-right font-bold" }, "Category"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right font-medium" },
        row.getValue("category")
        // row.
        // row.
      );
    },
  },
  {
    accessorKey: "size",
    header: () => h("div", { class: "text-right font-bold" }, "Size"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right font-medium" },
        row.getValue("size")
        // row.
        // row.
      );
    },
  },
  {
    accessorKey: "color",
    header: () => h("div", { class: "text-right font-bold" }, "Color"),
    cell: ({ row }) => {
      return h(
        Value,
        { colorCode: row.original.color.value }
        // row.original.color.name
      );
    },
  },
  {
    accessorKey: "images",
    header: () => h("div", { class: "text-right font-bold" }, "Images"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "flex flex-wrap w-30" },
        row.original.images.map((img) => {
          return h("img", {
            class: "text-right font-medium w-10 rounded-lg p-1",
            src: `${baseUrl()}/products/${img.url}`,
          });
        })
      );
    },
  },
  {
    accessorKey: "isFeatured",
    header: () => h("div", { class: "text-right font-bold" }, "Featured"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right font-medium" },
        row.original.isFeatured
      );
    },
  },
  {
    accessorKey: "isArchived",
    header: () => h("div", { class: "text-right font-bold" }, "Archived"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right font-medium" },
        row.original.isArchived
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
