import { useEffect, /* useRef, */ useState } from "react";
import { UserPlantList, UserProfileHeader } from "../components/inner-page/user";
import { useAuth } from "../context";
import type { UserPlant } from "../models/plant";
import { getUserPlants } from "../services";
import { Link, useParams } from "react-router-dom";
import { OtherUserProfilePage } from ".";
import { throttle } from "lodash";

export const ProfileLayout = () => {
  const { user } = useAuth();
  const { username } = useParams<{ username: string }>();
  const [plants, setPlants] = useState<UserPlant[]>([]);
  const [error, setError] = useState<string | null>(null);
  /* Pagination states */
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const person = user?.username;
  const isMyProfile = username === user?.username;

  const fetchPlants = async (page = 1) => {
    if (page === 1) {
      setInitialLoading(true);
    } else {
      setLoadingMore(true);
    }

    setError(null);

    try {
      const response = await getUserPlants(page);
      const userData = response.data;

      if (userData && userData.plants && Array.isArray(userData.plants)) {
        if (page === 1) {
          setPlants(userData.plants);
        } else {
          setPlants((prev) => [...prev, ...userData.plants]);
        }

        const nextPageExists = !!userData.meta?.hasMore;
        setHasMore(nextPageExists);
      } else {
        setHasMore(false);
        setPlants([]);
      }
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error loading plants");
      }
      setPlants([]);
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  };

  /* Fetch */
  useEffect(() => {
    fetchPlants(1);
  }, [isMyProfile]);

  /* Pagination */
  useEffect(() => {
    if (page === 1) return;

    fetchPlants(page);
  }, [page]);

  /* Infinite scroll */
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (initialLoading || loadingMore || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollHeight - scrollTop <= clientHeight * 2.5) {
        setPage((prev) => prev + 1);
      }
    }, 1000);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMyProfile) return <OtherUserProfilePage />;

  return (
    <div className="h-full flex flex-col">
      {/* Title */}
      <h1 className="text-2xl mt-3 mb-4">Hello {person}! Welcome to your profile.</h1>

      {/* Profile pic, bio and edit button */}
      <div className="flex gap-4 w-fit items-start">
        <img className="w-25 rounded-xl" src={user!.imgPublicUrl} alt={user!.username} />
        <div className="flex flex-col max-w-40">
          <p className="font-bold text-lg">@{user?.username}</p>
          <p className="wrap-break-word text-sm">{user?.profile_bio}</p>
          <Link
            to="edit-profile"
            className="flex items-center gap-1 font-medium border border-gray-800 text-gray-900 rounded-lg pr-2 pl-3 pt-0.5 pb-0.5 mt-2 w-fit text-center"
          >
            Edit profile
            <svg width="21" height="21">
              <use href="/assets/spriteSheet.svg#settings-icon" className="cursor-pointer" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Plants */}
      <div className="mt-5 h-full">
        <UserProfileHeader fetchPlants={fetchPlants} />
        <UserPlantList
          plants={plants}
          setPlants={setPlants}
          fetchPlants={fetchPlants}
          initialLoading={initialLoading}
          loadingMore={loadingMore}
          hasMore={hasMore}
        />
      </div>

      {/* Error */}
      {error && <p className="text-[#c53030] text-sm font-medium font-[quicksand] mt-2">{error}</p>}
    </div>
  );
};
