import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export const useAuthRedirect = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  if (!isLoggedIn) router.push("/");
};
