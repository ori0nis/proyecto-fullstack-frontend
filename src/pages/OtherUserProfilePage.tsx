import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../services";
import type { UserProfile } from "../models/user";

export const OtherUserProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const [friend, setFriend] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      setLoading(true);

      const fetchUser = async () => {
        try {
          const response = await getUserByUsername(username);

          if (response?.data?.users && response.data.users.length > 0) {
            const userProfile = response.data.users[0];
            setFriend(userProfile);
          }
        } catch (error) {
          console.error(error);
          alert("There was an error loading the profile");

          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Error loading profile");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (!friend) return <p>User not found</p>;

  return (
    <>
      {username && (
        <div className="flex flex-col h-full">
          <div className="flex gap-4 w-fit items-start">
            <img src={friend?.imgPublicUrl} alt={friend?.username} className="w-25 rounded-xl" />
            <div className="flex flex-col max-w-60">
              <p className="font-bold text-lg">@{friend?.username}</p>
              <p className="wrap-break-word text-sm">{friend?.profile_bio}</p>
              <p className="mt-2 text-sm font-medium">Plant care skill level: {friend?.plant_care_skill_level}</p>
            </div>
          </div>
          <span className="w-full mt-4 border-t" />
          <h3 className="mt-5 text-2xl">Plants:</h3>
          {friend?.plants && friend?.plants.length > 0 ? (
            <div className="mt-4 p-6 grid grid-cols-1 gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl-grid-cols-5">
              {friend?.plants.map((plant) => (
                <div
                  key={plant._id}
                  className="rounded-lg shadow-md shadow-neutral-500 overflow-hidden flex flex-col items-center text-center"
                >
                  <div className="w-full aspect-square overflow-hidden">
                    <img src={plant.imgPublicUrl} alt={plant.nameByUser} className="w-full h-full object-cover" />
                  </div>
                  <p className="mt-2 font-semibold">{plant.nameByUser}</p>
                  <p className="text-sm mb-2">{plant.scientific_name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3">No plants yet 🌱</p>
          )}
        </div>
      )}
      {error && <p className="text-black pl-2 pr-2 rounded-md bg-[#c53030] opacity-90 w-fit text-sm font-medium font-[quicksand] mt-1 mx-auto">{error}</p>}
    </>
  );
};
