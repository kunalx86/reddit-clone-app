import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { useCommentVote } from "../../hooks/comments";
import { Comment } from "../../types";

export const CommentsList: React.FC<{ comments: Comment[] }> = ({
  comments,
}) => {
  return (
    <Flex
      direction="column"
      borderRadius="md"
      border="1px"
      borderColor="black"
      alignItems="center"
      justifyItems="center"
      width="inherit"
      p={2}
    >
      <Heading>Comments</Heading>
      <hr
        style={{
          borderColor: "black",
        }}
      />
      <Flex direction="column" width="inherit">
        {comments.length > 0 &&
          comments.map((comment) => (
            <CommentDetail key={comment.id} comment={comment} />
          ))}
      </Flex>
    </Flex>
  );
};

const CommentDetail: React.FC<{ comment: Comment; ml?: number }> = ({
  comment,
  ml = 0,
}) => {
  const voteComment = useCommentVote();
  return (
    <Flex
      border="1px"
      borderRadius="md"
      borderColor="black"
      direction="column"
      width="inherit"
      ml={ml}
      mt={2}
      p={2}
    >
      by {comment.user.username} on{" "}
      {new Date(Date.parse(comment.createdAt)).toDateString()}
      <Text>{comment.comment}</Text>
      <Flex alignItems="center" justifyContent="center">
        <TriangleUpIcon
          _hover={{
            border: "1px",
            borderColor: "red",
          }}
          color={comment.voted && comment.voted === 1 ? "red" : "black"}
          onClick={() =>
            voteComment.mutate({
              commentId: comment.id,
              vote: 1,
              postId: comment.post.id.toString(),
            })
          }
          mr={0.5}
        />
        {comment.votesCount}
        <TriangleDownIcon
          _hover={{
            border: "1px",
            borderColor: "blue",
          }}
          color={comment.voted && comment.voted === -1 ? "blue" : "black"}
          onClick={() =>
            voteComment.mutate({
              commentId: comment.id,
              vote: -1,
              postId: comment.post.id.toString(),
            })
          }
          ml={0.5}
        />
      </Flex>
      {comment.replies.length > 0 &&
        comment.replies.map((reply) => (
          <CommentDetail key={reply.id} ml={ml + 2} comment={reply} />
        ))}
    </Flex>
  );
};
