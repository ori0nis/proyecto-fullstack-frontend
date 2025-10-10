import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { NewUser, PublicUser } from "../models/user";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../services";
import type { LoginUser } from "../models/user";
import { AuthContext } from ".";

interface Props {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const register = async (user: NewUser): Promise<boolean> => {
    try {
      await registerUser(user);
      return true;
    } catch {
      return false;
    }
  };

  const login = async (user: LoginUser) => {
    const loggedUser = await loginUser(user);
    setUser(loggedUser);
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/login", { replace: true });
    }
  };

  const hasRole = (role: string) => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading, isAuth: !!user, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};
