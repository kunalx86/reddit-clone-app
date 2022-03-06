import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useAuth } from "../../hooks/auth";
import { usePosts, useVotePost } from "../../hooks/posts";
import { Post, Media } from "../../types";
import { ShimmerPost } from "../Shimmer/ShimmerPost";

export const PostsPage = () => {
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePosts("upvoted");
  const router = useRouter();
  // Will worry about loading state later
  // if (isFetching) {
  //   return (
  //     <Flex direction="column" p={4} mt={4} alignItems="center">
  //       {Array.from({ length: 2 }).map((_) => (
  //         <ShimmerPost />
  //       ))}
  //     </Flex>
  //   );
  // }
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

export const PostDetail: React.FC<{ post: Post; onClick: () => void }> = ({
  post,
  onClick,
}) => {
  const { user } = useAuth();
  const votePost = useVotePost();
  return (
    <Flex
      direction="column"
      borderColor="black"
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
          mr={1}
          aria-label="Upvote"
          onClick={() => votePost.mutate({ postId: post.id, vote: 1 })}
          color={post.voted && post.voted == 1 ? "red" : "black"}
        />
        {post.votesCount}
        <TriangleDownIcon
          ml={1}
          border="0px"
          bgColor="white"
          aria-label="Downvote"
          onClick={() => votePost.mutate({ postId: post.id, vote: -1 })}
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
  return <Image src={media?.mediaUrl} />;
};
