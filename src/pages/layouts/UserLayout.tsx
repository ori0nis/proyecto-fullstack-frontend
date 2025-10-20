import { Outlet } from "react-router-dom";
import { UserSidebar } from "../../components/inner-page/user";
import { Footer } from "../../components/inner-page";

export const UserLayout = () => {
  return (
    <>
      {/* Sidebar */}
      <UserSidebar />

      {/* Outlet */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </>
  );
};
