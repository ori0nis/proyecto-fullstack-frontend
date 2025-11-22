//? Mapping of the UserPlant response from the backend

import type { PaginationMeta } from "../..";

export interface UserPlantResponse<T> {
  message: string;
  status: number;
  data: {
    plants: T[];
    meta: PaginationMeta | null;
  } | null;
}
