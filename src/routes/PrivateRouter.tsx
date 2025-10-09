import { Route } from "react-router-dom";
import { BrokenRouteAvoider } from "./routes-utils/BrokenRouteAvoider";

export const PrivateRouter = () => {
  return (
    <BrokenRouteAvoider>
      <Route path="profile" /* TODO: add element (layout) plus rest of routes */ />
    </BrokenRouteAvoider>
  );
};
