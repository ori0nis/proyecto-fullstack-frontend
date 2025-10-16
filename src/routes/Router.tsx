import type { ReactNode } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { AdminRouter, BrokenRouteAvoider, PrivateGuard, PrivateRouter } from ".";
import { AuthContextProvider } from "../context";
import { LoginLayout, RegisterLayout } from "../pages";

const VITE_API_PRIVATE_ENDPOINT = import.meta.env.VITE_API_PRIVATE_ENDPOINT;
const VITE_API_ADMIN_ENDPOINT = import.meta.env.VITE_API_ADMIN_ENDPOINT;

if (!VITE_API_PRIVATE_ENDPOINT) throw new Error("VITE_API_PRIVATE_ENDPOINT isn't defined in .env");
if (!VITE_API_ADMIN_ENDPOINT) throw new Error("VITE_API_ADMIN_ENDPOINT isn't defined in .env");

interface Props {
  children: ReactNode;
}

export const Router = ({ children }: Props) => {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <BrokenRouteAvoider>
            <Route path="/register" element={<RegisterLayout />} /* TODO: add element */ />
            <Route path="/login" element={<LoginLayout />} /* TODO: add element */ />
            <Route path="/logout" /* TODO: add element */ />
            <Route element={<PrivateGuard />}>
              <Route path={VITE_API_PRIVATE_ENDPOINT} element={<PrivateRouter />} />
            </Route>
            <Route element={<PrivateGuard requiredRole="admin" />}>
              <Route path={VITE_API_ADMIN_ENDPOINT} element={<AdminRouter />} />
            </Route>
          </BrokenRouteAvoider>
          {children}
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
};
