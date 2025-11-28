import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context";
import { Footer } from "..";

export const AdminSidebar = () => {
  const { user, logout } = useAuth();

  if (!user) return <p>Loading...</p>;

  const baseClass = "p-2 flex items-center gap-2 transition-colors duration-150 font-medium rounded-xl";

  const hoverActiveClass = "hover:bg-gray-200";
  const activeClass = "bg-gray-200";

  return (
    <>
      {/* // TODO: Logo */}
      <aside className="sticky top-0 h-screen row-span-2 w-fit hidden md:flex flex-col gap-3 p-4 border-r border-gray-700">
        <NavLink
          to="admin-panel/manage-users"
          className="text-center relative inline-block px-3 py-1 bg-[#4CAF50] border border-[#2E7D32] text-white font-extrabold text-lg rounded-[999px] shadow-md shadow-[#2E7D32]/50 -skew-x-6 select-none tracking-wide after:absolute after:top-0 after:left-0 after:w-full after:h-1/2 after:rounded-[999px] after:bg-[rgba(255,255,255,0.32)] after:content-['']"
        >
          Admin Panel
        </NavLink>
        <NavLink
          to={`profile/${user?.username}`}
          className={({ isActive }) => `${baseClass} ${hoverActiveClass} ${isActive ? activeClass : ""}`}
        >
          <svg width="21" height="21">
            <use href="/public/assets/spritesheet.svg#home-icon" />
          </svg>
          My Profile
        </NavLink>
        <NavLink
          to="nursery"
          className={({ isActive }) => `${baseClass} ${hoverActiveClass} ${isActive ? activeClass : ""}`}
        >
          <svg width="21" height="21">
            <use href="/public/assets/spritesheet.svg#plant-icon" />
          </svg>
          Admin Nursery
        </NavLink>
        {/* Log out */}
        <button
          onClick={logout}
          className="cursor-pointer text-left p-2 font-medium flex items-center gap-2 rounded-xl hover:bg-gray-200 transition-colors duration-150"
        >
          <svg width="21" height="21">
            <use href="/public/assets/spritesheet.svg#logout-icon" />
          </svg>
          Log out
        </button>

        {/* Footer */}
        <div className="mt-auto mx-auto">
          <Footer />
        </div>
      </aside>
    </>
  );
};
