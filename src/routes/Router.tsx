import type { ReactNode } from "react";
import dotenv from "dotenv";
import { BrowserRouter, Route } from "react-router-dom";
import { AdminRouter, BrokenRouteAvoider, PrivateGuard, PrivateRouter } from ".";
import { AuthContextProvider } from "../context";

dotenv.config();
const API_PRIVATE_ENDPOINT = process.env.API_PRIVATE_ENDPOINT;
const API_ADMIN_ENDPOINT = process.env.API_ADMIN_ENDPOINT;

if (!API_PRIVATE_ENDPOINT) throw new Error("API_PRIVATE_ENDPOINT isn't defined in .env");
if (!API_ADMIN_ENDPOINT) throw new Error("API_ADMIN_ENDPOINT isn't defined in .env");

interface Props {
  children: ReactNode;
}

export const Router = ({ children }: Props) => {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <BrokenRouteAvoider>
            <Route path="/register" /* TODO: add element */ />
            <Route path="/login" /* TODO: add element */ />
            <Route path="/logout" /* TODO: add element */ />
            <Route element={<PrivateGuard />}>
              <Route path={API_PRIVATE_ENDPOINT} element={<PrivateRouter />} />
            </Route>
            <Route element={<PrivateGuard requiredRole="admin" />}>
              <Route path={API_ADMIN_ENDPOINT} element={<AdminRouter />} />
            </Route>
          </BrokenRouteAvoider>
          {children}
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
};
