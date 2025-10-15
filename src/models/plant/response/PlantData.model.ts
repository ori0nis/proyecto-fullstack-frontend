//? Type that returns the Plant or Plant[] response plus the meta (pagination), if applicable

import type { PaginationMeta } from "../..";

export interface PlantData<T> {
  plants: T;
  meta?: PaginationMeta;
}
