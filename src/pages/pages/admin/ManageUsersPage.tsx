import { useEffect, useState } from "react";
import { throttle } from "lodash";
import { getAllUsers, getUserByEmail, getUserById, getUserByUsername } from "../../../services";
import type { PublicUser } from "../../../models/user";
import { UserList } from "../../../components/inner-page/admin";

export const ManageUsersPage = () => {
  const [searchType, setSearchType] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<PublicUser[]>([]);
  /* Pagination states */
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isAllUsersMode, setIsAllUsersMode] = useState<boolean>(false);

  /* User fetch */
  const fetchAllUsers = async (page = 1) => {
    if (page === 1) {
      setInitialLoading(true);
    } else {
      setLoadingMore(true);
    }

    setError(null);

    try {
      const response = await getAllUsers(page);
      const userData = response.data;

      if (userData && userData.users && Array.isArray(userData.users)) {
        if (page === 1) {
          setUsers(userData.users);
        } else {
          setUsers((prev) => [...prev, ...userData.users]);
        }

        const nextPageExists = !!userData.meta?.hasMore;
        setHasMore(nextPageExists);
      } else {
        setHasMore(false);
        setUsers([]);
      }
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error loading users");
      }
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  };

  /* Individual user search */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInitialLoading(true);
    setError(null);
    setUsers([]);

    try {
      let response;
      let userData;

      switch (searchType) {
        case "id":
          response = await getUserById(searchValue);
          userData = response.data;
          break;
        case "email":
          response = await getUserByEmail(searchValue);
          userData = response.data;
          break;
        case "username":
          response = await getUserByUsername(searchValue);
          userData = response.data;
          break;
      }

      if (userData) {
        setUsers(userData.users);
      } else {
        console.error("No users found");
      }
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Couldn't process your search");
      }
    } finally {
      setInitialLoading(false);
    }
  };

  /* Pagination */
  useEffect(() => {
    if (page === 1 || !isAllUsersMode) return;
    fetchAllUsers(page);
  }, [page, isAllUsersMode]);

  /* Infinite scroll */
  useEffect(() => {
    if (!isAllUsersMode) return;

    const handleScroll = throttle(() => {
      if (initialLoading || loadingMore || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        setPage((prev) => prev + 1);
      }
    }, 1000);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="mt-4 flex flex-col gap-2">
        <form action="post" onSubmit={handleSubmit}>
          <div className="mt-4 flex flex-col gap-2 pl-4 pr-4 pt-2 pb-2 border rounded-lg w-fit">
            {/* Search */}
            <label htmlFor="searchType">Search for a user: </label>
            <select
              name="searchType"
              id="searchType"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="text-sm border p-1 rounded-lg max-w-[200px]"
            >
              <option value="">-- Choose a search type --</option>
              <option value="id">Search by id</option>
              <option value="email">Search by email</option>
              <option value="username">Search by username</option>
            </select>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="font-[quicksand] text-sm max-w-[200px] px-2 py-1 rounded-lg border border-gray-400 text-gray-800 placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            />
            <button
              type="submit"
              className="self-start cursor-pointer font-medium border border-gray-900 rounded-md p-1"
            >
              Submit
            </button>
          </div>
        </form>
        {/* Trigger of search all */}
        <button
          onClick={() => {
            setIsAllUsersMode(true);
            setPage(1);
            fetchAllUsers(1);
          }}
          className="cursor-pointer w-fit text-md border pr-3 pl-3 pt-0.5 pb-0.5 rounded-lg font-medium text-sm mt-4 bg-amber-300"
        >
          Click here for a list of all users
        </button>
        {/* UserList */}
        {(isAllUsersMode || users.length > 0) && (
          <UserList users={users} initialLoading={initialLoading} loadingMore={loadingMore} hasMore={hasMore} />
        )}
        {/* States */} {/* // TODO: Replace with spinner  */}
        {initialLoading && users.length > 0 && <p>Loading more users...</p>}
        {error && <p className="text-[#c53030] text-sm font-medium font-[quicksand] mt-2">{error}</p>}
      </div>
    </>
  );
};
