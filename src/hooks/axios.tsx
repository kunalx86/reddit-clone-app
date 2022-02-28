import { useContext } from "react";
import { AxiosContext } from "../contexts/axiosContext";

export const useAxios = () => useContext(AxiosContext);