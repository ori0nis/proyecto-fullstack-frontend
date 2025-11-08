import { useEffect, useState } from "react";
import { UserPlantList, UserProfileHeader } from "../components/inner-page/user";
import { useAuth } from "../context";
import type { UserPlant } from "../models/plant";
import { getUserPlants } from "../services";
import { Link, useParams } from "react-router-dom";
import { OtherUserProfilePage } from ".";

export const ProfileLayout = () => {
  const { user } = useAuth();
  const { username } = useParams<{ username: string }>();
  const [plants, setPlants] = useState<UserPlant[]>([]);

  const person = user?.username;
  const isMyProfile = username === user?.username;

  const fetchPlants = async () => {
    try {
      const response = await getUserPlants();

      if (response.data && response.data.userPlants) {
        setPlants(response.data.userPlants);
      } else {
        setPlants([]);
      }
    } catch (error) {
      console.error("Error fetching plants: ", error);
      setPlants([]);
    }
  };

  useEffect(() => {
    if (isMyProfile) fetchPlants();
  }, [isMyProfile]);

  return isMyProfile ? (
    <div>
      <h1>Hello {person}! Welcome to your profile</h1>
      <img className="w-15" src={user!.imgPublicUrl} alt={user!.username} />
      <Link to="edit-profile">Edit your profile</Link>
      <UserProfileHeader fetchPlants={fetchPlants} />
      <UserPlantList plants={plants} setPlants={setPlants} />
    </div>
  ) : (
    <OtherUserProfilePage />
  );
};
