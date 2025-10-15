//? Generic User response from the MyPlants API

import type { UserData } from "..";

export interface UserResponse<T> {
  message: string;
  status: number;
  data: UserData<T>;
}
