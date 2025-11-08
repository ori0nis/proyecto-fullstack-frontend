import { Link } from "react-router-dom";
import { useAuth } from "../../../context";

export const AdminSidebar = () => {
  const { user, logout } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <h2>Admin Panel</h2>
      <Link to="admin-panel/manage-users">Manage users</Link>
      <Link to="admin-panel/nursery">Admin Nursery</Link>
      <h2>User Area</h2>
      <Link to={`profile/${user?.username}`}>My Profile</Link>
      <button onClick={logout}>Log out</button>
    </>
  );
};
