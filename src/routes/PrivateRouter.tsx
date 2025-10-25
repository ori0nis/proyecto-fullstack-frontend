import { Navigate, Route, Routes } from "react-router-dom";
import { ProfileLayout } from "../pages";
import { UserLayout } from "../pages/layouts";
import { FindFriendsPage, UserNurseryPage } from "../pages/pages/user";
import { EditProfileLayout } from "../pages";
import { ChangePasswordForm, DeleteAccountForm, EditProfileForm } from "../components/inner-page/user";

export const PrivateRouter = () => {
  return (
    <Routes>
      <Route path="home/" element={<UserLayout />}>
        <Route path="" element={<Navigate to="profile" />} />
        <Route path="profile" element={<ProfileLayout />} />
        <Route path="profile/edit-profile/" element={<EditProfileLayout />}>
          <Route path="" element={<EditProfileForm />} />
          <Route path="change-password" element={<ChangePasswordForm />} />
          <Route path="delete-account" element={<DeleteAccountForm />} />
        </Route>
        <Route path="nursery" element={<UserNurseryPage />} />
        <Route path="friends" element={<FindFriendsPage />} />
      </Route>
    </Routes>
  );
};
