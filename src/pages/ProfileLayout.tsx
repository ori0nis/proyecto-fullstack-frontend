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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const person = user?.username;
  const isMyProfile = username === user?.username;

  const fetchPlants = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getUserPlants();

      if (response.data && response.data.plants) {
        setPlants(response.data.plants);
      } else {
        setPlants([]);
      }
    } catch (error) {
      console.error("Error fetching plants: ", error);
      setPlants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, [isMyProfile]);

  return isMyProfile ? (
    <div className="h-full flex flex-col">
      {/* Title */}
      <h1 className="text-2xl mt-3 mb-4">Hello {person}! Welcome to your profile.</h1>
      {/* Profile pic, bio and edit button */}
      <div className="flex gap-4 w-fit items-start">
        <img className="w-25 rounded-xl" src={user!.imgPublicUrl} alt={user!.username} />
        <div className="flex flex-col max-w-40">
          <p className="font-bold text-lg">@{user?.username}</p>
          <p className="wrap-break-word text-sm">{user?.profile_bio}</p>
          <Link to="edit-profile" className="flex items-center gap-1 font-medium border border-gray-800 text-gray-900 rounded-lg pr-2 pl-3 pt-0.5 pb-0.5 mt-2 w-fit text-center">
            Edit profile
            <svg width="21" height="21">
              <use href="/public/assets/spritesheet.svg#settings-icon" className="cursor-pointer"/>
            </svg>
          </Link>
        </div>
      </div>
      {/* Plants */}
      <div className="mt-5 h-full">
        <UserProfileHeader fetchPlants={fetchPlants} />
        <UserPlantList plants={plants} setPlants={setPlants} fetchPlants={fetchPlants}/>
      </div>
      {/* Loader */} {/* // TODO: Replace with spinner */}
      {loading && plants.length > 0 && <p>Loading more plants...</p>}
      {/* Error */}
      {error && (
        <p className="text-black pl-2 pr-2 rounded-md bg-[#c53030] opacity-90 w-fit text-sm font-medium font-[quicksand] mt-1 mx-auto">
          {error}
        </p>
      )}
    </div>
  ) : (
    <OtherUserProfilePage />
  );
};
