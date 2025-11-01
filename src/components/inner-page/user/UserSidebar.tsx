import { Link } from "react-router-dom";
import { useAuth } from "../../../context";

export const UserSidebar = () => {
  const { user, logout } = useAuth();

  if (!user) return <p>Loading user...</p>;

  return (
    <>
      <Link to={`profile/${user?.username}`}>My Profile</Link>
      <Link to="nursery">MyPlants Nursery</Link>
      <Link to="friends">Find friends</Link>
      <button onClick={logout}>Log out</button>
    </>
  );
};
