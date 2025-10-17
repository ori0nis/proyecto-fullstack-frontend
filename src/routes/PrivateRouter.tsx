import { Navigate, Route, Routes } from "react-router-dom";
import { Profile } from "../pages/Profile";

export const PrivateRouter = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate to="profile" />} />
      <Route path="profile" element={<Profile />} /* TODO: add element (layout) */ />
      <Route path="users/search/username" /* TODO: add element */ />
    </Routes>
  );
};
