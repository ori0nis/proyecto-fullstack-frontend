import { useEffect, useState, type ReactNode } from "react";
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
    await logoutUser();
    setUser(null);
  };

  // TODO: Role logic

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading, isAuth: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
