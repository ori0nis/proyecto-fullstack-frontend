import { useState } from "react";
import { getUserByUsername } from "../services";
import type { UserProfile } from "../models/user";
import { useNavigate } from "react-router-dom";

export const FindFriendsPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [friend, setFriend] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const userFound = await getUserByUsername(username);

      if (userFound) {
        setSuccess(true);
        setFriend(userFound);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
      alert("There was an error in your search");

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Couldn't search for friends");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Searching...</p>;

  return (
    <>
      <div>
        <form action="get" onSubmit={handleSubmit}>
          <label htmlFor="username">Find friends: </label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Search for a username..."
          />
          <button type="submit">Find friends</button>
          {success && friend && (
            <div className="">
              <h2>{friend.username}</h2>
              <button onClick={() => {
                navigate(`/myplants/home/profile/${friend.username}`)
              } }>View profile</button>
            </div>
          )}
        </form>
        {error && <p className="">{error}</p>}
      </div>
    </>
  );
};
