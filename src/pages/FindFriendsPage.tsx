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

      if (userFound.data && userFound.data.users) {
        setSuccess(true);
        setFriend(userFound.data.users[0]);
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
        <form action="get" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <label htmlFor="username" className="font-[quicksand] text-md mb-1 block">
            Find friends:
          </label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Search for a username..."
            className="font-[quicksand] text-sm max-w-[200px] px-2 py-1 rounded-lg border border-gray-400 text-gray-800 placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
          />
          <button type="submit" className="self-start border p-1 rounded-lg cursor-pointer text-sm">
            Submit
          </button>
          {success && friend && (
            <div className="flex items-center gap-3 mt-4">
              <img src={friend.imgPublicUrl} alt={friend.username} className="rounded-full w-15" />
              <p className="text-sm font-bold">@{friend.username}</p>
              <button
                onClick={() => {
                  navigate(`/myplants/home/profile/${friend.username}`);
                }}
                className="text-sm border p-1 rounded-lg cursor-pointer"
              >
                View profile
              </button>
            </div>
          )}
        </form>
        {error && <p className="text-[#c53030] text-sm font-medium font-[quicksand] mt-2">{error}</p>}
      </div>
    </>
  );
};
