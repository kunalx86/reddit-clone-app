import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { Post } from "../types";
import { useAxios } from "./axios";

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
  const infiniteQueryRet = useInfiniteQuery(
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

  useEffect(() => {
    // TODO: Implement scroll event listener and automatic refetching
    // TODO: Figure out Event Type for callback function
    const handleScroll = (event: Event) => {};
    return () => {};
  }, []);
  return infiniteQueryRet;
};
