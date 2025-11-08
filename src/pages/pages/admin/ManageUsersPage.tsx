import { useEffect, useState } from "react";
import { throttle } from "lodash";
import { getAllUsers, getUserByEmail, getUserById, getUserByUsernameAdmin } from "../../../services";
import type { PublicUser } from "../../../models/user";
import { UserList } from "../../../components/inner-page/admin";

export const ManageUsersPage = () => {
  const [searchType, setSearchType] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [users, setUsers] = useState<PublicUser[]>([]);
  /* Pagination states */
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isAllUsersMode, setIsAllUsersMode] = useState<boolean>(false);

  const fetchAllUsers = async (page = 1) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

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
        setSuccess(true);
      } else {
        setHasMore(false);
        setSuccess(false);
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
      alert("There was an error searching for users");

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error loading users");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchAll = async () => {
    setPage(1);
    setIsAllUsersMode(true);
    await fetchAllUsers(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

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
          response = await getUserByUsernameAdmin(searchValue);
          userData = response.data;
          break;
      }

      if (userData) {
        console.log(userData.users);
        setUsers(userData.users);
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
      alert("There was an error processing your search");

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Couldn't process your search");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page > 1 && isAllUsersMode) fetchAllUsers(page);
  }, [page, isAllUsersMode]);

  useEffect(() => {
    if (!isAllUsersMode) return;

    const handleScroll = throttle(() => {
      if (loading || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        setPage((prev) => prev + 1);
      }
    }, 500);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAllUsersMode, loading, hasMore]);

  return (
    <>
      <div>
        <form action="post" onSubmit={handleSubmit}>
          <label htmlFor="searchType">Select your type of search: </label>
          <select name="searchType" id="searchType" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="">-- Choose a search type --</option>
            <option value="id">Search by id</option>
            <option value="email">Search by email</option>
            <option value="username">Search by username</option>
          </select>
          <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <button type="submit">Submit</button>
        </form>

        {/* Trigger of search all */}
        <button onClick={handleSearchAll}>Click here for a list of all users</button>

        {/* UserList with prop */}
        <UserList users={users} />

        {/* Loader */} {/* // TODO: Replace with spinner  */}
        {loading && users.length > 0 && <p>Loading more users...</p>}
        
        {error && <p>{error}</p>}
        {success && <p>Successfully loaded users!</p>}
        {!hasMore && isAllUsersMode && <p>You're all caught up</p>}
      </div>
    </>
  );
};
