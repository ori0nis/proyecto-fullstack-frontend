import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../pages/layouts";
import { EditProfileLayout, ProfileLayout } from "../pages";
import { useAuth } from "../context";
import { ChangePasswordForm, DeleteAccountForm, EditProfileForm } from "../components/inner-page/user";
import { AdminEditUserPage, AdminNurseryPage, ManageUsersPage } from "../pages/pages/admin";

const VITE_API_ADMIN_ENDPOINT_SEARCH_ALL = import.meta.env.VITE_API_ADMIN_ENDPOINT_SEARCH_ALL;
const VITE_API_ADMIN_ENDPOINT_SEARCH_ID = import.meta.env.VITE_API_ADMIN_ENDPOINT_SEARCH_ID;
const VITE_API_ADMIN_ENDPOINT_SEARCH_EMAIL = import.meta.env.VITE_API_ADMIN_ENDPOINT_SEARCH_EMAIL;

if (!VITE_API_ADMIN_ENDPOINT_SEARCH_ALL) throw new Error("VITE_API_ADMIN_ENDPOINT_SEARCH_ALL isn't defined in .env");
if (!VITE_API_ADMIN_ENDPOINT_SEARCH_ID) throw new Error("VITE_API_ADMIN_ENDPOINT_SEARCH_ID isn't defined in .env");
if (!VITE_API_ADMIN_ENDPOINT_SEARCH_EMAIL)
  throw new Error("VITE_API_ADMIN_ENDPOINT_SEARCH_EMAIL isn't defined in .env");

export const AdminRouter = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading... </p>;

  return (
    <Routes>
      <Route path="home/" element={<AdminLayout />}>
        {/* Default redirect - always to the owner's profile */}
        <Route path="" element={<Navigate to={`profile/${user.username}`} replace />} />

        {/* Admin panel */}
        <Route path="admin-panel/manage-users" element={<ManageUsersPage />} />
        <Route path="admin-panel/manage-users/edit/:id" element={<AdminEditUserPage />} />
        <Route path="admin-panel/nursery" element={<AdminNurseryPage />} />

        {/* Rendering of user's profile */}
        <Route path="profile/:username" element={<ProfileLayout />} />

        {/* Routes relative to profile editing */}
        <Route path="profile/:username/edit-profile/" element={<EditProfileLayout />}>
          <Route path="" element={<EditProfileForm />} />
          <Route path="change-password" element={<ChangePasswordForm />} />
          <Route path="delete-account" element={<DeleteAccountForm />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to={`/admin/home/profile/${user.username}`} replace />} />
      </Route>
    </Routes>
  );
};
