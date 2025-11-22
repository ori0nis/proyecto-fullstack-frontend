import type { UserPlant } from "../../plant";

export interface UserProfile {
  username: string;
  imgPublicUrl: string;
  plant_care_skill_level: string;
  profile_bio: string;
  plants: UserPlant[];
}
