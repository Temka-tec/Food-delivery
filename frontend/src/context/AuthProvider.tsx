"use client";

import { api } from "@/lib/axios";
import {
  Children,
  createContext,
  useContext,
  PropsWithChildren,
  useState,
} from "react";

import { useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    email: string,
  ) => Promise<void>;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    const { data } = await api.post("/auth/login", {
      username,
      password,
    });

    const { user } = data;

    setUser(user);

    router.push("/");
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
