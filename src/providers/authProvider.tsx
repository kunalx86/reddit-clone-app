import React, { useCallback, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { LoginCredentials, User } from "../types";
import { useAxios } from "../hooks/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/dist/client/router";

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [{ user, isLoggedIn, error }, setState] = useState<{
    user?: User;
    isLoggedIn: boolean;
    error: string;
  }>({
    user: null,
    isLoggedIn: false,
    error: null,
  });
  const axios = useAxios();
  const router = useRouter();

  const checkStatus = useCallback(async () => {
    const response = await axios.get<{ data: User | null }>("/whoami", {
      withCredentials: true,
    });
    setState((prev) => ({
      ...prev,
      isLoggedIn: !!response.data.data,
      user: response.data.data,
      error: null,
    }));
  }, []);

  useEffect(() => {
    setLoading(true);
    checkStatus().catch((err: AxiosError<{ error: string }>) => {
      setState((prev) => ({
        ...prev,
        error: err?.response?.data?.error || "Something went wrong",
      }));
    });
    setLoading(false);
  }, []);

  const login = useCallback((creds: LoginCredentials) => {
    setLoading(true);
    axios
      .post("/auth/login", creds, {
        withCredentials: true,
      })
      .then((_) => {
        checkStatus();
        router.reload();
      })
      .catch((err: AxiosError<{ error: string }>) => {
        setState((prev) => ({
          ...prev,
          error: err?.response?.data?.error || "Something went wrong",
        }));
      });
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    setLoading(true);
    axios
      .post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((_) => {
        checkStatus();
        router.reload();
      })
      .catch((err) => {
        setState((prev) => ({
          ...prev,
          error: err?.message || "Something went wrong",
        }));
      });
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isLoading,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
