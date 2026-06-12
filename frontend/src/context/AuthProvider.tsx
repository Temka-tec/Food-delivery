"use client";

import { api } from "@/lib/axios";
import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
} from "react";

import { useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    email: string,
  ) => Promise<void>;
};

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    const { user, accessToken } = data;

    setUser(user);
    localStorage.setItem("token", accessToken);

    router.push(user.role === "admin" ? "/admin" : "/");
  };

  const register = async (
    username: string,
    password: string,
    email: string,
  ) => {
    await api.post("/auth/register", {
      username,
      password,
      email,
    });

    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
