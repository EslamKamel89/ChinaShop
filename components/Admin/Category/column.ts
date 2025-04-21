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
    header: () => h("div", { class: "text-right" }, "Name"),
    cell: ({ row }) => {
      //   const amount = Number.parseFloat(row.getValue("amount"));
      //   const formatted = new Intl.NumberFormat("en-US", {
      //     style: "currency",
      //     currency: "USD",
      //   }).format(amount);

      return h(
        "div",
        { class: "text-right font-medium" },
        row.getValue("name")
      );
    },
  },
];
