//? Mapping of the User mongoose document

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  imgPath: string;
  imgPublicUrl: string;
  plant_care_skill_level: string;
  role: string;
  plants: string[];
}
