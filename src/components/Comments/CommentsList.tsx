import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useCommentVote } from "../../hooks/comments";
import { Comment } from "../../types";
import { CommentForm } from "./CommentForm";

export const CommentsList: React.FC<{
  comments: Comment[];
  postId: string;
}> = ({ comments, postId }) => {
  return (
    <Flex
      direction="column"
      borderRadius="md"
      border="1px"
      borderColor="black"
      alignItems="center"
      justifyItems="center"
      p={2}
    >
      <Heading>Comments</Heading>
      <hr
        style={{
          borderColor: "black",
        }}
      />
      <CommentForm postId={postId} />
      <Flex direction="column" width="inherit" maxWidth={400}>
        {comments.length > 0
          ? comments.map((comment) => (
              <CommentDetail key={comment.id} comment={comment} />
            ))
          : "No comments yet"}
      </Flex>
    </Flex>
  );
};

const CommentDetail: React.FC<{ comment: Comment; ml?: number }> = ({
  comment,
  ml = 0,
}) => {
  const voteComment = useCommentVote();
  const [isOpen, setIsOpen] = useState(false);
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
      <Text>
        {comment.comment.split(/\n/).map((line) => (
          <>
            {line}
            <br />
          </>
        ))}
      </Text>
      <Flex alignItems="center" justifyContent="center">
        <Button
          bgColor="white"
          border="0px"
          mr={2}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Reply
        </Button>
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
      {isOpen && (
        <CommentForm
          postId={comment.post.id.toString()}
          reply
          parent={comment.id}
        />
      )}
      {comment.replies.length > 0 &&
        comment.replies.map((reply) => (
          <CommentDetail key={reply.id} ml={ml + 2} comment={reply} />
        ))}
    </Flex>
  );
};
