import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { Button, Heading, useToast } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useAuth } from "../../hooks/auth";
import { usePosts, useVotePost } from "../../hooks/posts";
import { Post, Media } from "../../types";
import { ShimmerPost } from "../Shimmer/ShimmerPost";

export const PostsList = () => {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePosts("upvoted");
  const router = useRouter();
  if (status === "loading") {
    return (
      <Flex direction="column" p={4} mt={4} alignItems="center">
        {Array.from<number>({ length: 2 }).map((_) => (
          <ShimmerPost key={_} />
        ))}
      </Flex>
    );
  }
  return (
    <>
      <Flex direction="column">
        {data?.pages?.map((page) =>
          page.data.posts.map((post) => (
            <PostDetail
              key={post.id}
              onClick={() => router.push(`/posts/${post.id}`)}
              post={post}
            />
          ))
        )}
        <Button
          onClick={() => fetchNextPage()}
          isDisabled={!hasNextPage || isFetchingNextPage}
        >
          Load More
        </Button>
      </Flex>
      {isFetchingNextPage && (
        <Flex direction="column" p={4} mt={4} alignItems="center">
          {Array.from({ length: 2 }).map((_, idx) => (
            <ShimmerPost key={idx} />
          ))}
        </Flex>
      )}
    </>
  );
};

export const PostDetail: React.FC<{
  post: Post;
  onClick: () => void;
  detail?: boolean;
}> = ({ post, onClick, detail = false }) => {
  const votePost = useVotePost();
  const { isLoggedIn } = useAuth();
  const toast = useToast();

  return (
    <Flex
      direction="column"
      borderColor="black"
      width={detail && "25%"}
      border="1px"
      rounded="md"
      mb={1}
      mt={1}
      p={2}
    >
      <Flex direction="column" onClick={onClick}>
        <Heading>{post.title}</Heading>
        <hr
          style={{
            borderColor: "black",
          }}
        />
        by u/{post?.author?.username} on{" "}
        {new Date(Date.parse(post.createdAt)).toDateString()}
        <PostMedia media={post?.media} />
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <TriangleUpIcon
          _hover={{
            border: "1px",
            borderColor: "red",
          }}
          mr={1}
          aria-label="Upvote"
          onClick={() =>
            isLoggedIn
              ? votePost.mutate({ postId: post.id, vote: 1, detail })
              : toast({
                  status: "error",
                  title: "Error!",
                  description: "Not authenticated",
                  isClosable: true,
                  duration: 5000,
                })
          }
          color={post.voted && post.voted == 1 ? "red" : "black"}
        />
        {post.votesCount}
        <TriangleDownIcon
          ml={1}
          _hover={{
            border: "1px",
            borderColor: "blue",
          }}
          border="0px"
          bgColor="white"
          aria-label="Downvote"
          onClick={() =>
            isLoggedIn
              ? votePost.mutate({ postId: post.id, vote: -1, detail })
              : toast({
                  status: "error",
                  title: "Error!",
                  description: "Not authenticated",
                  isClosable: true,
                  duration: 5000,
                })
          }
          color={post.voted && post.voted == -1 ? "blue" : "black"}
        />
        <Text ml={2}>{post.comments} Comments</Text>
      </Flex>
    </Flex>
  );
};

const PostMedia: React.FC<{ media: Media }> = ({ media }) => {
  if (media?.type === "TEXT") {
    return <Text>{media?.mediaText}</Text>;
  }
  if (media?.type === "IMAGE") {
    return <Image width="60%" height="60%" shadow="md" src={media?.mediaUrl} />;
  }
  return <></>;
};
