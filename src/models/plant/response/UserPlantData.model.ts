//? Type that returns the UserPlant or UserPlant[] response plus the meta (pagination), if applicable

import type { PaginationMeta } from "../../";
import type { UserPlant } from "..";

export interface UserPlantData {
  userPlants: UserPlant[];
  meta: PaginationMeta;
}
