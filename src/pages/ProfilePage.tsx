import { useEffect, useState } from "react";
import { UserPlantList, UserProfileHeader } from "../components/inner-page/user";
import { useAuth } from "../context";
import type { UserPlant } from "../models/plant";
import { getUserPlants } from "../services";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
      <h1>Hello {person}! Welcome to your profile</h1>
      {user && console.log(user)}
      {user && user.imgPublicUrl ? (
        <img src={user.imgPublicUrl} alt={user.username} />
      ) : (
        <img className="w-15" src={"/images/user-placeholder.png"} alt="user profile pic" />
      )}
      {/* {!user?.imgPublicUrl && <img className="w-15" src={"/images/user-placeholder.png"} alt="user profile pic" />} */}
      <button onClick={() => navigate("edit-profile")}>Edit your profile</button>
      <UserProfileHeader fetchPlants={fetchPlants} />
      <UserPlantList plants={plants} setPlants={setPlants} />
    </>
  );
};
