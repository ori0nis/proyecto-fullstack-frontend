import { Route } from "react-router-dom";
import { BrokenRouteAvoider } from ".";

const VITE_API_ADMIN_ENDPOINT_SEARCH_ALL = import.meta.env.VITE_API_ADMIN_ENDPOINT_SEARCH_ALL;
const VITE_API_ADMIN_ENDPOINT_SEARCH_ID = import.meta.env.VITE_API_ADMIN_ENDPOINT_SEARCH_ID;
const VITE_API_ADMIN_ENDPOINT_SEARCH_EMAIL = import.meta.env.VITE_API_ADMIN_ENDPOINT_SEARCH_EMAIL;

if (!VITE_API_ADMIN_ENDPOINT_SEARCH_ALL) throw new Error("VITE_API_ADMIN_ENDPOINT_SEARCH_ALL isn't defined in .env");
if (!VITE_API_ADMIN_ENDPOINT_SEARCH_ID) throw new Error("VITE_API_ADMIN_ENDPOINT_SEARCH_ID isn't defined in .env");
if (!VITE_API_ADMIN_ENDPOINT_SEARCH_EMAIL) throw new Error("VITE_API_ADMIN_ENDPOINT_SEARCH_EMAIL isn't defined in .env");

export const AdminRouter = () => {
  return (
    <BrokenRouteAvoider>
      <Route path={VITE_API_ADMIN_ENDPOINT_SEARCH_ALL} /* TODO: add element */ />
      <Route path={VITE_API_ADMIN_ENDPOINT_SEARCH_ID} /* TODO: add element */ />
      <Route path={VITE_API_ADMIN_ENDPOINT_SEARCH_EMAIL} /* TODO: add element */ />
    </BrokenRouteAvoider>
  );
};
