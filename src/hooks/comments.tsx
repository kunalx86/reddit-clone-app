import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAxios } from "./axios";
import { Comment } from "../types";
import { AxiosError } from "axios";
import { useToast } from "@chakra-ui/toast";

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

interface VoteComment {
  commentId: number;
  vote: 1 | -1;
  postId: string;
}

export const useCommentVote = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(
    async ({ commentId, vote }: VoteComment) => {
      const response = await axios.post<{ data: Comment }>(
        `comments/${commentId}/vote`,
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
      onMutate: ({ commentId, vote, postId }) => {
        const previousData = queryClient.getQueryData(["comments", postId]);
        queryClient.setQueryData<Comment[]>(["comments", postId], (prev) =>
          prev.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  voted:
                    vote === -1
                      ? comment.voted === -1
                        ? 0
                        : -1
                      : comment.voted === 1
                      ? 0
                      : 1,
                  votesCount:
                    vote === -1
                      ? comment.voted === -1
                        ? comment.votesCount + 1
                        : !comment.voted
                        ? comment.votesCount - 1
                        : comment.votesCount - 2
                      : comment.voted === 1
                      ? comment.votesCount - 1
                      : !comment.voted
                      ? comment.votesCount + 1
                      : comment.votesCount + 2,
                }
              : {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply.id === commentId
                      ? {
                          ...reply,
                          voted:
                            vote === -1
                              ? reply.voted === -1
                                ? 0
                                : -1
                              : reply.voted === 1
                              ? 0
                              : 1,
                          votesCount:
                            vote === -1
                              ? reply.voted === -1
                                ? reply.votesCount + 1
                                : !reply.voted
                                ? reply.votesCount - 1
                                : reply.votesCount - 2
                              : reply.voted === 1
                              ? reply.votesCount - 1
                              : !reply.voted
                              ? reply.votesCount + 1
                              : reply.votesCount + 2,
                        }
                      : reply
                  ),
                }
          )
        );
        return previousData;
      },
      onError: (err: AxiosError<{ error: string }>, data, context) => {
        queryClient.setQueryData(["comments", data.postId], context);
        toast({
          status: "error",
          title: "Error!",
          description: err.response?.data?.error || "Something went wrong!",
          isClosable: true,
          duration: 5000,
        });
      },
      onSuccess: (data) => {
        // queryClient.invalidateQueries([
        //   "comments",
        //   data.data.post.id.toString(),
        // ]);
      },
    }
  );
};
