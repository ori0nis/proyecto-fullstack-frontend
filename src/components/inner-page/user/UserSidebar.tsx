import { Link } from "react-router-dom";
import { useAuth } from "../../../context";

export const UserSidebar = () => {
  const { logout } = useAuth();

  return (
    <>
      <Link to="profile">My Profile</Link>
      <Link to="nursery">MyPlants Nursery</Link>
      <Link to="friends">Find friends</Link>
      <button onClick={logout}>Log out</button>
    </>
  );
};
