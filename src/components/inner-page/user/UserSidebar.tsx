import { Link } from "react-router-dom";
import { useAuth } from "../../../context";
import { Footer } from "..";
import { useState } from "react";

export const UserSidebar = () => {
  const { user, logout } = useAuth();
  const [dropdownSidebar, setDropdownSidebar] = useState<boolean>(false);

  /* //TODO: Replace with skeleton */
  if (!user) return <p>Loading user...</p>;

  return (
    <>
      {/* // TODO: Logo */}
      {/* Big screen sidebar */}
      <aside className="hidden md:flex flex-col w-fit gap-3 p-4 border-r">
        {/* Links */}
        <Link to={`profile/${user?.username}`} className="p-1 font-medium">
          My Profile
        </Link>
        <Link to="nursery" className="p-1 font-medium">
          MyPlants Nursery
        </Link>
        <Link to="friends" className="p-1 font-medium">
          Find friends
        </Link>
        {/* Log out */}
        <button onClick={logout} className="cursor-pointer text-left p-1 font-medium">
          Log out
        </button>
        {/* Footer */}
        <div className="mt-auto mx-auto">
          <Footer />
        </div>
      </aside>

      {/* Small screen dropdown icon */}
      <button
        className="md:hidden fixed top-2 right-2 z-50 text-3xl font-bold"
        onClick={() => setDropdownSidebar((prev) => !prev)}
      >
        <svg width="24" height="24">
          <use href="/public/assets/spritesheet.svg#menu-icon" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {dropdownSidebar && (
        <div
          className="
            xs:hidden fixed top-0 left-0 w-full bg-amber-200 rounded-md shadow-lg z-40 flex flex-col p-2 gap-4 origin-top animate-dropdown"
        >
          <button
            className="absolute top-9 right-6 text-xl font-bold"
            onClick={() => setDropdownSidebar((prev) => !prev)}
          >
            X
          </button>
          <div className="pt-8 flex flex-col gap-2">
            <Link
              to={`profile/${user?.username}`}
              className="p-1 font-medium"
              onClick={() => setDropdownSidebar(false)}
            >
              My Profile
            </Link>
            <Link to="nursery" className="p-1 font-medium" onClick={() => setDropdownSidebar(false)}>
              MyPlants Nursery
            </Link>
            <Link to="friends" className="p-1 font-medium" onClick={() => setDropdownSidebar(false)}>
              Find friends
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
