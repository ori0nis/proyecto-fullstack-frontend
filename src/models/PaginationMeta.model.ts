//? Type that mirrors pagination parameters sent by the backend

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}
