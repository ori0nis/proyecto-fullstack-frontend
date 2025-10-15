//? Mapping of the Plant mongoose document

import type { PlantData } from "..";

export interface PlantResponse<T> {
  message: string;
  status: number;
  data: PlantData<T>;
}
