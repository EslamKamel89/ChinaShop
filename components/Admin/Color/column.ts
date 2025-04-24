import CallAction from "@/components/Admin/Color/CellAction.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import Value from "~/components/Admin/Color/Value.vue";
export interface Color {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}
export const columns: ColumnDef<Color>[] = [
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
    header: () => h("div", { class: "text-right font-bold" }, "Color Value"),
    cell: ({ row }) => {
      return h(
        Value,
        { colorCode: row.getValue("value") as string },
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
      const color = row.original;
      return h("div", { class: "relative" }, h(CallAction, { color }));
    },
  },
];
