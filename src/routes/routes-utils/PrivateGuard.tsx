import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context";
import { Unauthorized } from "./Unauthorized";
import { AppLoadingSkeleton } from "../../components/inner-page";

interface Props {
  requiredRole?: string;
}

export const PrivateGuard = ({ requiredRole }: Props) => {
  const { isAuth, hasRole, loadingAuth } = useAuth();

  if (loadingAuth) return <AppLoadingSkeleton />; // TODO: Don't apply profile skeleton on nursery or find friends

  if (!isAuth) return <Navigate to="/login" replace />;

  if (requiredRole && !hasRole(requiredRole)) return <Unauthorized />;

  return <Outlet />;
};
