import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context";
import { Unauthorized } from "./Unauthorized";

interface Props {
  requiredRole?: string;
}

export const PrivateGuard = ({ requiredRole }: Props) => {
  const { isAuth, hasRole, loadingAuth } = useAuth();

  if (loadingAuth) return <p>Authenticating user...</p>; // TODO: Replace for spinner

  if (!isAuth) return <Navigate to="/login" replace />;

  if (requiredRole && !hasRole(requiredRole)) return <Unauthorized />;

  return <Outlet />;
};
