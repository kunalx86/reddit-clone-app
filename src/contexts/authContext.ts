import React from "react";
import { LoginCredentials, User } from "../types";

export const AuthContext = React.createContext<{
  user?: User,
  isLoading: boolean,
  isLoggedIn: boolean,
  error?: string,
  login: (creds: LoginCredentials) => void,
  logout: () => void
}>({
  isLoading: true,
  isLoggedIn: false,
  login: (_) => {},
  logout: () => {}
});