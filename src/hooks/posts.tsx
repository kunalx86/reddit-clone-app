import { useToast } from "@chakra-ui/toast";
import { AxiosError } from "axios";
import { useEffect } from "react";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
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
    ["posts"],
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

export const usePost = (postId: string) => {
  const axios = useAxios();
  return useQuery(["posts", postId], async () => {
    const response = await axios.get<{ data: Post }>(`posts/${postId}`, {
      withCredentials: true,
    });
    return response.data.data;
  });
};

interface VotePost {
  postId: number;
  vote: 1 | -1;
}

export const useVotePost = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();
  const toast = useToast();
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
        queryClient.setQueryData(["posts"], (prev: InfiniteData<Response>) => ({
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
      onMutate: ({ postId, vote }) => {
        const previousData: InfiniteData<Response> = queryClient.getQueryData([
          "posts",
        ]);
        queryClient.setQueryData(["posts"], (prev: InfiniteData<Response>) => ({
          ...prev,
          pages: prev.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              posts: page.data.posts.map((post) =>
                post.id === postId
                  ? {
                      ...post,
                      voted:
                        vote === -1
                          ? post.voted === -1
                            ? 0
                            : -1
                          : post.voted === 1
                          ? 0
                          : 1,
                      votesCount:
                        vote === -1
                          ? post.voted === -1
                            ? post.votesCount + 1
                            : !post.voted
                            ? post.votesCount - 1
                            : post.votesCount - 2
                          : post.voted === 1
                          ? post.votesCount - 1
                          : !post.voted
                          ? post.votesCount + 1
                          : post.votesCount + 2,
                    }
                  : post
              ),
            },
          })),
        }));
        return previousData;
      },
      onError: (err: AxiosError<{ error: string }>, data, context) => {
        queryClient.setQueryData(["posts"], context);
        toast({
          status: "error",
          title: "Error!",
          description: err.response?.data?.error || "Something went wrong!",
          isClosable: true,
          duration: 5000,
        });
      },
      onSettled: (data) => {
        // queryClient.invalidateQueries(["posts"]);
      },
    }
  );
};
