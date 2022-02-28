import React, { useMemo } from "react";
import Axios from "axios";
import { AxiosContext } from "../contexts/axiosContext";

export const AxiosProvider: React.FC = ({ children }) => {
  const axios = useMemo(
    () =>
      Axios.create({
        baseURL: "https://localhost:3000/api",
        validateStatus: (status) => status < 300,
      }),
    []
  );

  return (
    <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>
  );
};
