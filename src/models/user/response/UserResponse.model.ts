//? Generic User response from the MyPlants API

export interface UserResponse<T> {
  message: string;
  status: number;
  data: T | null;
}
