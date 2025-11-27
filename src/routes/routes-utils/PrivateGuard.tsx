import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context";
import { Unauthorized } from "./Unauthorized";
import { AppLoadingSkeleton, ProfileLoadingSkeleton } from "../../components/inner-page";

interface Props {
  requiredRole?: string;
}

export const PrivateGuard = ({ requiredRole }: Props) => {
  const { user, isAuth, hasRole, loadingAuth } = useAuth();
  const location = useLocation();

  if (loadingAuth) {
    const isProfile = location.pathname === `/myplants/home/profile/${user?.username}`;

    return isProfile ? <ProfileLoadingSkeleton /> : <AppLoadingSkeleton />;
  }

  if (!isAuth) return <Navigate to="/login" replace />;

  if (requiredRole && !hasRole(requiredRole)) return <Unauthorized />;

  return <Outlet />;
};
