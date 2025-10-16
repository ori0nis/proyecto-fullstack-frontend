import { Navigate, Route } from "react-router-dom";
import { BrokenRouteAvoider } from "./routes-utils/BrokenRouteAvoider";
import { Profile } from "../pages/Profile";

export const PrivateRouter = () => {
  return (
    <BrokenRouteAvoider>
      <Route path="" element={<Navigate to="profile" />} />
      <Route path="profile" element={<Profile />} /* TODO: add element (layout) */ />
      <Route path="users/search/username" /* TODO: add element */ />
    </BrokenRouteAvoider>
  );
};
