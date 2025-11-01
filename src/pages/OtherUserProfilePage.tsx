import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../services";
import type { UserProfile } from "../models/user";

export const OtherUserProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const [friend, setFriend] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (username) {
      setLoading(true);

      const fetchUser = async () => {
        try {
          const userProfile = await getUserByUsername(username);

          if (userProfile) {
            setSuccess(true);
            setFriend(userProfile)
          } else {
            setSuccess(false);
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
        <div className="">
          {friend?.imgPublicUrl && <img src={friend?.imgPublicUrl} alt={friend?.username} />}
          <h2>{friend?.username}</h2>
          <p>Plant care skill level: {friend?.plant_care_skill_level}</p>
          <h3>Plants:</h3>
          {friend?.plants && friend?.plants.length > 0 ? (
            <ul>
              {friend?.plants.map((plant) => (
                <li key={plant._id}>{plant.nameByUser}</li>
              ))}
            </ul>
          ) : (
            <p>No plants yet 🌱</p>
          )}
        </div>
      )}
      {error && <p className="">{error}</p>}
      {success && <p></p>}
    </>
  );
};
