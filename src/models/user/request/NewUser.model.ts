//? Type of User sent in the register form

export interface NewUser {
  username: string;
  email: string;
  password: string;
  plant_care_skill_level: string;
  plantImg?: File;
}
