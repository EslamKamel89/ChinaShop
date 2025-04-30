export type APIError = {
  statusCode: number;
  statusMessage: string;
  message: string;
  data?: Record<string, string>;
};
export type ProductFilters = {
  colorId?: string | null;
  sizeId?: string | null;
  categoryId?: string | null;
  isFeatured?: string | null;
  isArchived?: string | null;
};
