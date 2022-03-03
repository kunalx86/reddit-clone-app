import { ArrowDownIcon, ArrowUpIcon, SpinnerIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Divider, Flex, Text } from "@chakra-ui/layout";
import { useAuth } from "../../hooks/auth";
import { usePosts } from "../../hooks/posts";
import { Post, Media } from "../../types";

export const PostsPage = () => {
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePosts("upvoted");
  if (isFetching) {
    return <SpinnerIcon />;
  }
  return (
    <Flex direction="column">
      {data.pages.map((page) =>
        page.data.posts.map((post) => <PostDetail key={post.id} post={post} />)
      )}
    </Flex>
  );
};

const PostDetail: React.FC<{ post: Post }> = ({ post }) => {
  const { user } = useAuth();
  return (
    <Flex
      direction="column"
      borderColor="black.300"
      rounded="md"
      mb={1}
      mt={1}
      p={2}
    >
      {post.title}
      {/* <Divider /> */}
      {post.author.username}
      <PostMedia media={post.media} />
      <Flex justifyContent="center" alignItems="center">
        {post.hasVoted == 1 ? (
          <ArrowUpIcon fill="ActiveBorder" />
        ) : (
          <ArrowUpIcon />
        )}
        {/* <ArrowUpIcon /> */}
        {post.votesCount}
        {post.hasVoted == 1 ? (
          <ArrowDownIcon fill="ActiveBorder" />
        ) : (
          <ArrowDownIcon />
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
