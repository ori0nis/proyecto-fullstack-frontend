//? Type of response after User login

import type { PublicUser } from "../index";

export interface LoginResponse {
  token: string;
  data: PublicUser;
}
