//? Mapping of the Plant response from the backend

import type { PaginationMeta } from "../../PaginationMeta.model";

export interface PlantResponse<T> {
  message: string;
  status: number;
  data: {
    plants: T[];
    meta: PaginationMeta | null;
  } | null;
}
