//? Mapping of the UserPlant response from the backend

export interface UserPlantResponse<T> {
  message: string;
  status: number;
  data: T;
}
