import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context";
import { Unauthorized } from "./Unauthorized";

interface Props {
  requiredRole?: string;
}

export const PrivateGuard = ({ requiredRole }: Props) => {
  const { isAuth, hasRole, loading } = useAuth();

  if (loading) return <p>Authenticating user...</p>;
  if (requiredRole && !hasRole("admin")) return <Unauthorized />;

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};
