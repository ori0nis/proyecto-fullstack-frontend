import { createContext, useContext } from "react";
import type { LoginUser, NewUser, PublicUser } from "../models/user";

interface AuthContextProps {
  user: PublicUser | null;
  register: (user: NewUser) => Promise<boolean>;
  login: (user: LoginUser) => Promise<PublicUser | null>;
  logout: () => Promise<void>;
  loadingAuth: boolean;
  error: string | null;
  setError: (value: string | null) => void;
  isAuth: boolean;
  hasRole: (role: string) => boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthContext provider");

  return context;
};
