import { Route } from "react-router-dom";
import dotenv from "dotenv";
import { BrokenRouteAvoider } from ".";

dotenv.config();

const API_ADMIN_ENDPOINT_SEARCH_ALL = process.env.API_ADMIN_ENDPOINT_SEARCH_ALL;
const API_ADMIN_ENDPOINT_SEARCH_ID = process.env.API_ADMIN_ENDPOINT_SEARCH_ID;
const API_ADMIN_ENDPOINT_SEARCH_EMAIL = process.env.API_ADMIN_ENDPOINT_SEARCH_EMAIL;

if (!API_ADMIN_ENDPOINT_SEARCH_ALL) throw new Error("API_ADMIN_ENDPOINT_SEARCH_ALL isn't defined in .env");
if (!API_ADMIN_ENDPOINT_SEARCH_ID) throw new Error("API_ADMIN_ENDPOINT_SEARCH_ID isn't defined in .env");
if (!API_ADMIN_ENDPOINT_SEARCH_EMAIL) throw new Error("API_ADMIN_ENDPOINT_SEARCH_EMAIL isn't defined in .env");

export const AdminRouter = () => {
  return (
    <BrokenRouteAvoider>
      <Route path={API_ADMIN_ENDPOINT_SEARCH_ALL} /* TODO: add element */ />
      <Route path={API_ADMIN_ENDPOINT_SEARCH_ID} /* TODO: add element */ />
      <Route path={API_ADMIN_ENDPOINT_SEARCH_EMAIL} /* TODO: add element */ />
    </BrokenRouteAvoider>
  );
};
