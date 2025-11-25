import { Outlet } from "react-router-dom";
import { UserSidebar } from "../../components/inner-page/user";

export const UserLayout = () => {
  return (
    <div className="bg-amber-100 grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] min-h-screen">
      {/* Sidebar */}
      <UserSidebar />

      {/* Content */}
      <div className="flex-1 flex flex-col pt-8 pl-8 pr-8">
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};