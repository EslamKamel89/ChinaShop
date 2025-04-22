import CallAction from "@/components/Admin/Category/CellAction.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
export interface Category {
  id: string;
  name: string;
  createdAt: string;
}
export const columns: ColumnDef<Category>[] = [
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
      const category = row.original;
      return h("div", { class: "relative" }, h(CallAction, { category }));
    },
  },
];
