//? Mapping of the Plant response from the backend

import type { PlantData } from "..";

export interface PlantResponse<T> {
  message: string;
  status: number;
  data: PlantData<T>;
}
