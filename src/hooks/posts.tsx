import { useEffect } from "react";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";
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
        `/posts?page=${pageParam}&sortBy=${sortBy}`,
        {
          withCredentials: true,
        }
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

interface VotePost {
  postId: number;
  vote: 1 | -1;
}

export const useVotePost = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();
  return useMutation(
    async ({ postId, vote }: VotePost) => {
      const response = await axios.post<Post>(
        `/posts/${postId}/vote`,
        {
          vote,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData("posts", (prev: InfiniteData<Response>) => ({
          ...prev,
          pages: prev.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              posts: page.data.posts.map((post) =>
                post.id === data.id ? data : post
              ),
            },
          })),
        }));
      },
      onSettled: () => {
        // queryClient.invalidateQueries("posts");
      },
    }
  );
};
