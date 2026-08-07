"use client";
import { useAuth } from "@/lib/store/authStore";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuth((state) => state.setUser);
  const clearUser = useAuth((state) => state.clearAuth);

  useEffect(() => {
    const fetchAuth = async () => {
      const isAuth = await checkSession();

      if (isAuth) {
        const user = await getMe();
        if (user) {
          setUser(user);
        }
      } else {
        clearUser();
      }
    };

    fetchAuth();
  }, [setUser, clearUser]);

  return children;
};

export default AuthProvider;
