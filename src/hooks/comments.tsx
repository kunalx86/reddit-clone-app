import { useQuery } from "react-query";
import { useAxios } from "./axios";
import { Comment } from "../types";

export const useComments = (postId: string) => {
  const axios = useAxios();
  return useQuery(["comments", postId], async () => {
    const response = await axios.get<{ data: Comment[] }>(
      `/comments/${postId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  });
};
