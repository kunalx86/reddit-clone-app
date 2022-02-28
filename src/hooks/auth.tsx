import { useContext } from "react"
import { AuthContext } from "../contexts/authContext"

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}