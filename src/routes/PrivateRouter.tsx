import { Navigate, Route, Routes } from "react-router-dom";
import { ProfilePage } from "../pages";
import { UserLayout } from "../pages/layouts";
import { ChangePasswordPage, FindFriendsPage, UserNurseryPage } from "../pages/pages/user";
import { EditProfilePage } from "../pages/pages/user";

export const PrivateRouter = () => {
  return (
    <Routes>
      <Route path="home/" element={<UserLayout />}>
        <Route path="" element={<Navigate to="profile" />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="nursery" element={<UserNurseryPage />} />
        <Route path="friends" element={<FindFriendsPage />} />
        <Route path="profile/edit-profile" element={<EditProfilePage />} />
        <Route path="profile/edit-profile/change-password" element={<ChangePasswordPage />} />
      </Route>
    </Routes>
  );
};
