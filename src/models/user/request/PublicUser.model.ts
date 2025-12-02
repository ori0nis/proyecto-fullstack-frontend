//? Type for safer User responses

export interface PublicUser {
  _id: string;
  username: string;
  email: string;
  imgPath: string;
  imgPublicUrl: string;
  plant_care_skill_level: string;
  profile_bio: string;
  role: string;
  plants: string[];
}
