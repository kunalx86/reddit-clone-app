import { ArrowDownIcon, ArrowUpIcon, SpinnerIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { Button, Heading } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../hooks/auth";
import { usePosts, useVotePost } from "../../hooks/posts";
import { Post, Media } from "../../types";
import { ShimmerPost } from "../Shimmer/ShimmerPost";

export const PostsPage = () => {
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePosts("upvoted");
  if (isFetching) {
    return (
      <Flex direction="column" p={4} mt={4} alignItems="center">
        {Array.from({ length: 2 }).map((_) => (
          <ShimmerPost />
        ))}
      </Flex>
    );
  }
  return (
    <>
      <Flex direction="column">
        {data.pages.map((page) =>
          page.data.posts.map((post) => (
            <PostDetail key={post.id} post={post} />
          ))
        )}
      </Flex>
      {isFetchingNextPage && (
        <Flex direction="column" p={4} mt={4} alignItems="center">
          {Array.from({ length: 2 }).map((_) => (
            <ShimmerPost />
          ))}
        </Flex>
      )}
      <Button
        onClick={() => fetchNextPage()}
        isDisabled={!hasNextPage || isFetchingNextPage}
      >
        Load More
      </Button>
    </>
  );
};

const PostDetail: React.FC<{ post: Post }> = ({ post }) => {
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
      <Heading>{post.title}</Heading>
      <hr
        style={{
          borderColor: "black",
        }}
      />
      by u/{post.author.username} on{" "}
      {new Date(Date.parse(post.createdAt)).toDateString()}
      <PostMedia media={post.media} />
      <Flex justifyContent="center" alignItems="center">
        {post.voted && post.voted == 1 ? (
          <ArrowUpIcon
            color="red"
            onClick={() => votePost.mutate({ postId: post.id, vote: 1 })}
          />
        ) : (
          <ArrowUpIcon
            onClick={() => votePost.mutate({ postId: post.id, vote: 1 })}
          />
        )}
        {post.votesCount}
        {post.voted && post.voted == -1 ? (
          <ArrowDownIcon
            color="blue"
            onClick={() => votePost.mutate({ postId: post.id, vote: -1 })}
          />
        ) : (
          <ArrowDownIcon
            onClick={() => votePost.mutate({ postId: post.id, vote: -1 })}
          />
        )}
      </Flex>
    </Flex>
  );
};

const PostMedia: React.FC<{ media: Media }> = ({ media }) => {
  if (media.type === "TEXT") {
    return <Text>{media.mediaText}</Text>;
  }
  return <Image src={media.mediaUrl} />;
};
