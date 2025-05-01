import {
  getGraphData,
  getSalesCount,
  getStockCount,
  getTotalRevenue,
} from "~/server/utils/analytics";
import { GraphData } from "./../../../../types/index.d";

export default defineEventHandler(async (event) => {
  const totalRevenue = await getTotalRevenue();
  const salesCount = await getSalesCount();
  const stockCount = await getStockCount();
  const graphData: GraphData[] = await getGraphData();
  return { totalRevenue, stockCount, salesCount, graphData };
});
