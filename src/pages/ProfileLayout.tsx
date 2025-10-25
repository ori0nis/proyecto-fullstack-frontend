import { useEffect, useState } from "react";
import { UserPlantList, UserProfileHeader } from "../components/inner-page/user";
import { useAuth } from "../context";
import type { UserPlant } from "../models/plant";
import { getUserPlants } from "../services";
import { Link  } from "react-router-dom";

export const ProfileLayout = () => {
  const { user } = useAuth();
  const [plants, setPlants] = useState<UserPlant[]>([]);

  const person = user?.username;

  const fetchPlants = async () => {
    try {
      const response = await getUserPlants();
      setPlants(response.data.userPlants);
    } catch (error) {
      console.error("Error fetching plants: ", error);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <>
      {/* Header and profile pic */}
      <h1>Hello {person}! Welcome to your profile</h1>
      <img className="w-15" src={user!.imgPublicUrl} alt={user!.username} />

      {/* Link to edit profile */}
      <Link to="edit-profile">Edit your profile</Link>

      {/* Add a plant + user plant list */}
      <UserProfileHeader fetchPlants={fetchPlants} />
      <UserPlantList plants={plants} setPlants={setPlants} />
    </>
  );
};
