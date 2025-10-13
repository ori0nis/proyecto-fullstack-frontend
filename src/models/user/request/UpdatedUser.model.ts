//? Type for User edit requests

export interface UpdatedUser {
  username: string;
  email: string;
  plantImg: File;
  plant_care_skill_level: string;
  plants: string[];
}
