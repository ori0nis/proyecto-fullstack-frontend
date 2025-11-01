import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminRouter, NotFound, PrivateGuard, PrivateRouter } from ".";
import { AuthContextProvider, EditProfileContextProvider } from "../context";
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
          <EditProfileContextProvider>
            <Routes>
              <Route path="/register" element={<RegisterLayout />} />
              <Route path="/login" element={<LoginLayout />} />
              <Route path="/logout" />

              {/* Private router */}
              <Route element={<PrivateGuard />}>
                <Route path={`${VITE_API_PRIVATE_ENDPOINT}/*`} element={<PrivateRouter />} />
              </Route>

              {/* Admin router */}
              <Route element={<PrivateGuard requiredRole="admin" />}>
                <Route path={`${VITE_API_ADMIN_ENDPOINT}/*`} element={<AdminRouter />} />
              </Route>

              {/* Any other wrong routes */}
              <Route path="*" element={<Navigate to="/login" replace />} />
              <Route path="/404" element={<NotFound />} />
            </Routes>
            {children}
          </EditProfileContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
};
