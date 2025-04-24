import CallAction from "@/components/Admin/Size/CellAction.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
export interface Size {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}
export const columns: ColumnDef<Size>[] = [
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
    accessorKey: "value",
    header: () => h("div", { class: "text-right font-bold" }, "Size Value"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right font-medium" },
        row.getValue("value")
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
      const size = row.original;
      return h("div", { class: "relative" }, h(CallAction, { size }));
    },
  },
];
