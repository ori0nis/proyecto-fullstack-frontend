import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../../components/inner-page/admin";
import { Footer } from "../../components/inner-page";

export const AdminLayout = () => {
  return (
    <>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Outlet */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </>
  );
};
