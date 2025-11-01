import { Link } from "react-router-dom";

export const AdminSidebar = () => {
  /* Should return:
    
    - Sidebar with:
        - Admin Panel with:
            - MyPlants Nursery (with management options)
            - Find users (with management options)
        - Your profile
    - Footer
    */
  return (
    <>
      <h2>Admin Panel</h2>
      <Link to="">Manage users</Link>
      <Link to="">Admin Nursery</Link>
      <h2>User Area</h2>
      <Link to="profile">My Profile</Link>
    </>
  );
};
