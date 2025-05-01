import type { GraphData } from "~/types";
import db from "~/utils/db";
export const getTotalRevenue = async () => {
  const result = (
    await db.order.findMany({
      where: { isPaid: true },
      include: { orderItems: { include: { product: true } } },
    })
  ).reduce(
    (totalSum, order) =>
      totalSum +
      order.orderItems.reduce(
        (sum, orderItem) => sum + orderItem.product.price,
        0
      ),
    0
  );
  return result;
};

export const getStockCount = async (): Promise<number> => {
  const result = (await db.product.findMany({ where: { isArchived: false } }))
    .length;
  return result;
};

export const getSalesCount = async (): Promise<number> => {
  const result = (await db.order.findMany({ where: { isPaid: true } })).length;
  return result;
};
export const getGraphData = async (): Promise<GraphData[]> => {
  const paidOrders = await db.order.findMany({
    where: { isPaid: true },
    include: { orderItems: { include: { product: true } } },
  });
  const monthlyRevenu: { [key: number]: number } = {};
  for (const order of paidOrders) {
    const month = order.createdAt.getMonth() - 1;
    let revenueForOrder = 0;
    for (const item of order.orderItems) {
      revenueForOrder += item.product.price;
    }
    monthlyRevenu[month] = (monthlyRevenu[month] ?? 0) + revenueForOrder;
  }
  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];
  for (const month in monthlyRevenu) {
    graphData[parseInt(month)].total = monthlyRevenu[parseInt(month)];
  }
  return graphData;
};
