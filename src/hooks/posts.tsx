import { useInfiniteQuery } from "react-query";
import { useAxios } from "./axios";

interface Post {
  id: number;
  title: string;
}

interface Response {
  data: {
    posts: Post[];
    hasMore: boolean;
    count: number;
    next: number;
  };
}

type SortBy = "upvoted" | "downvoted" | "latest";

export const usePosts = (sortBy: SortBy = "upvoted") => {
  const axios = useAxios();
  return useInfiniteQuery(
    "posts",
    async ({ pageParam = 0 }) => {
      const res = await axios.get<Response>(
        `/posts?page=${pageParam}&sortBy=${sortBy}`
      );
      return res.data;
    },
    {
      getNextPageParam: (prevPage) =>
        prevPage.data.hasMore ? prevPage.data.next : false,
    }
  );
};
