import { Outlet } from "react-router-dom";
import { UserSidebar } from "../../components/inner-page/user";

export const UserLayout = () => {
  return (
    <div className="flex min-h-screen bg-amber-100">
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
