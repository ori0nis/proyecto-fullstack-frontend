import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../pages/layouts";
import { EditProfileLayout, ProfileLayout } from "../pages";
import { useAuth } from "../context";
import { ChangePasswordForm, DeleteAccountForm, EditProfileForm } from "../components/inner-page/user";
import { AdminEditUserPage, AdminNurseryPage, ManageUsersPage } from "../pages/pages/admin";


export const AdminRouter = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading admin... </p>;

  return (
    <Routes>
      <Route path="home/" element={<AdminLayout />}>
        {/* Default redirect - always to the owner's profile */}
        <Route path="" element={<Navigate to={`profile/${user.username}`} replace />} />

        {/* Admin panel */}
        <Route path="admin-panel/manage-users" element={<ManageUsersPage />} />
        <Route path="admin-panel/manage-users/edit/:id" element={<AdminEditUserPage />} />

        {/* Rendering of admin's profile */}
        <Route path="profile/:username" element={<ProfileLayout />} />

        {/* Routes relative to profile editing */}
        <Route path="profile/:username/edit-profile/" element={<EditProfileLayout />}>
          <Route path="" element={<EditProfileForm />} />
          <Route path="change-password" element={<ChangePasswordForm />} />
          <Route path="delete-account" element={<DeleteAccountForm />} />
        </Route>

        {/* Nursery (with edit/delete) */}
        <Route path="nursery" element={<AdminNurseryPage />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to={`/admin/home/profile/${user.username}`} replace />} />
      </Route>
    </Routes>
  );
};
