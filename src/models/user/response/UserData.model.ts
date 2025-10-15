//? Type that returns the User or User[] response plus the meta (pagination), if applicable

import type { PaginationMeta } from "../..";

export interface UserData<T> {
  users: T;
  meta?: PaginationMeta;
}
