//? Generic User response from the MyPlants API

import type { PaginationMeta } from "../..";

export interface UserResponse<T> {
  message: string;
  status: number;
  data: {
    users: T[];
    meta: PaginationMeta | null;
  } | null;
}
