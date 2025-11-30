import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context";
import { Footer } from "..";
import { useState } from "react";

export const UserSidebar = () => {
  const { user, logout } = useAuth();
  const [dropdownSidebar, setDropdownSidebar] = useState<boolean>(false);

  if (!user) return <p>Loading user...</p>;

  const baseClass = "p-2 flex items-center gap-2 transition-colors duration-150 font-medium rounded-xl";

  const hoverActiveClass = "hover:bg-gray-200";
  const activeClass = "bg-gray-200";

  return (
    <>
      {/* // TODO: Logo */}
      {/* Big screen sidebar */}
      <aside className="sticky top-0 h-screen row-span-2 w-fit hidden md:flex flex-col gap-3 p-4 border-r border-gray-700">
        {/* Links */}
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
          MyPlants Nursery
        </NavLink>

        <NavLink
          to="friends"
          className={({ isActive }) => `${baseClass} ${hoverActiveClass} ${isActive ? activeClass : ""}`}
        >
          <svg width="21" height="21">
            <use href="/public/assets/spritesheet.svg#search-icon" />
          </svg>
          Find friends
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

      {/* Small screen dropdown icon */}
      <button
        className="md:hidden fixed top-2 right-2 z-50 text-3xl font-bold p-0.5 border rounded-sm border-gray-600 cursor-pointer"
        onClick={() => setDropdownSidebar((prev) => !prev)}
      >
        <svg width="26" height="24">
          <use href="/public/assets/spritesheet.svg#menu-icon" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {dropdownSidebar && (
        <div className="md:hidden fixed top-0 left-0 w-full bg-amber-200 rounded-md shadow-lg z-40 flex flex-col p-2 gap-4 origin-top animate-dropdown">
          <div className="pt-8 flex flex-col gap-2">
            <Link
              to={`profile/${user?.username}`}
              className="p-2 font-medium flex items-center gap-2 rounded-xl hover:bg-gray-300 transition-colors duration-150"
              onClick={() => setDropdownSidebar(false)}
            >
              <svg width="21" height="21">
                <use href="/public/assets/spritesheet.svg#home-icon" />
              </svg>
              My Profile
            </Link>

            <Link
              to="nursery"
              className="p-2 font-medium flex items-center gap-2 rounded-xl hover:bg-gray-300 transition-colors duration-150"
              onClick={() => setDropdownSidebar(false)}
            >
              <svg width="21" height="21">
                <use href="/public/assets/spritesheet.svg#plant-icon" />
              </svg>
              MyPlants Nursery
            </Link>

            <Link
              to="friends"
              className="p-2 font-medium flex items-center gap-2 rounded-xl hover:bg-gray-300 transition-colors duration-150"
              onClick={() => setDropdownSidebar(false)}
            >
              <svg width="21" height="21">
                <use href="/public/assets/spritesheet.svg#search-icon" />
              </svg>
              Find friends
            </Link>

            <button
              onClick={logout}
              className="cursor-pointer text-left p-2 font-medium flex items-center gap-2 rounded-xl hover:bg-gray-300 transition-colors duration-150"
            >
              <svg width="21" height="21">
                <use href="/public/assets/spritesheet.svg#logout-icon" />
              </svg>
              Log out
            </button>
          </div>
        </div>
      )}
    </>
  );
};
