import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks";

export const PrivateGuard = () => {
  const { isAuth, loading } = useAuth();

  if (loading) return <p>Authenticating user...</p>
  
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};
