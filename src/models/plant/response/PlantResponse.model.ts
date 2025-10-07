//? Mapping of the Plant mongoose document

export interface PlantResponse<T> {
  message: string;
  status: number;
  data: T;
}
