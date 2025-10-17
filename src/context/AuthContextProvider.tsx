import { useEffect, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { NewUser, PublicUser } from "../models/user";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../services";
import type { LoginUser } from "../models/user";
import { AuthContext } from ".";

interface Props {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      if (["/login", "/register"].includes(location.pathname)) {
        setLoadingAuth(false);
        return;
      }

      setLoadingAuth(true);
      try {
        const response = await getCurrentUser();
        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching current user:", err);
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    };

    checkSession();
  }, [location.pathname]);

  const register = async (user: NewUser): Promise<boolean> => {
    try {
      await registerUser(user);
      navigate("/login", { replace: true });
      return true;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("There was an error completing the register");
      }
      return false;
    }
  };

  const login = async (loginData: LoginUser): Promise<boolean> => {
    setError(null);
    try {
      const response = await loginUser(loginData);
      setUser(response.data.user);

      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unexpected login error";
      setError(message);
      setUser(null);
      return false;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      if (location.pathname !== "/login") {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("There was an error completing the logout");
      }
    } finally {
      if (location.pathname !== "/login") {
        navigate("/login", { replace: true });
      }
    }
  };

  const hasRole = (role: string) => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, loadingAuth, error, setError, isAuth: !!user, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};
