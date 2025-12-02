import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFriendsPlants, getPublicUserByUsername } from "../services";
import type { UserProfile } from "../models/user";
import { PlantCardSkeleton, ProfileCardLoadingSkeleton } from "../components/inner-page";
import type { UserPlant } from "../models/plant";
import { throttle } from "lodash";

export const OtherUserProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const [plants, setPlants] = useState<UserPlant[]>([]);
  const [friend, setFriend] = useState<UserProfile | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  /* Pagination states */
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  /* Fetch user */
  const fetchUser = async () => {
    if (page === 1) {
      setInitialLoading(true);
    } else {
      setLoadingMore(true);
    }

    setError(null);

    if (username) {
      try {
        const response = await getPublicUserByUsername(username);

        if (response?.data?.users && response.data.users.length > 0) {
          const userProfile = response.data.users[0];
          setFriend(userProfile);
        }
      } catch (error) {
        console.error(error);

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error loading profile");
        }
      } finally {
        setInitialLoading(false);
      }
    }
  };

  /* Fetch plants */
  const fetchPlants = async (page = 1) => {
    if (page === 1) {
      setInitialLoading(true);
    } else {
      setLoadingMore(true);
    }

    setError(null);

    try {
      if (!username) return;

      const response = await getFriendsPlants(username, page);
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
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error loading plants");
      }
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (!username) return;

    setPage(1);
    setPlants([]);
    setIsFirstLoad(true);
    fetchUser();
    fetchPlants(1).finally(() => setIsFirstLoad(false));
  }, [username]);

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

  if (initialLoading && isFirstLoad) {
    return (
      <>
        {/* Profile card skeleton */}
        <ProfileCardLoadingSkeleton />

        {/* Plants skeleton */}
        <div className="mt-2 p-6 grid grid-cols-1 gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <PlantCardSkeleton key={i} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      {/* Friend card */}
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

          {/* Plants */}
          <h3 className="mt-5 text-2xl">Plants:</h3>
          {!initialLoading && !isFirstLoad && plants.length === 0 ? (
            <p className="mt-3">No plants yet 🌱</p>
          ) : plants.length > 0 ? (
            <div className="mt-4 p-6 grid grid-cols-1 gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
              {plants.map((plant) => (
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
          ) : null}
        </div>
      )}

      {/* Infinite scroll skeletons */}
      {loadingMore && hasMore && (
        <div className="mt-2 p-6 grid grid-cols-1 gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <PlantCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {error && <p className="text-[#c53030] text-sm font-medium font-[quicksand] mt-2">{error}</p>}
    </>
  );
};
