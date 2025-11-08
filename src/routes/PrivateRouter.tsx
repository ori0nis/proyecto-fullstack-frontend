import { Navigate, Route, Routes } from "react-router-dom";
import { ProfileLayout, FindFriendsPage, EditProfileLayout } from "../pages";
import { UserLayout } from "../pages/layouts";
import { UserNurseryPage } from "../pages/pages/user";
import { ChangePasswordForm, DeleteAccountForm, EditProfileForm } from "../components/inner-page/user";
import { useAuth } from "../context";

export const PrivateRouter = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading user...</p>;

  return (
    <Routes>
      <Route path="home/" element={<UserLayout />}>
        {/* Default redirect - always to the owner's profile */}
        <Route path="" element={<Navigate to={`profile/${user.username}`} replace />} />

        {/* Rendered profile */}
        <Route path="profile/:username" element={<ProfileLayout />} />

        {/* Routes relative to profile editing */}
        <Route path="profile/:username/edit-profile/" element={<EditProfileLayout />}>
          <Route path="" element={<EditProfileForm />} />
          <Route path="change-password" element={<ChangePasswordForm />} />
          <Route path="delete-account" element={<DeleteAccountForm />} />
        </Route>

        {/* Rest of routes */}
        <Route path="nursery" element={<UserNurseryPage />} />
        <Route path="friends" element={<FindFriendsPage />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to={`/myplants/home/profile/${user.username}`} replace />} />
      </Route>
    </Routes>
  );
};
