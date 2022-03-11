import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import cookie from "cookie";
import https from "https";
import { dehydrate, QueryClient } from "react-query";
import { getAxios } from "../../providers/axiosProvider";
import { Post } from "../../types";
import { PostDetail } from "../../components/Posts/PostsList";
import { useComments } from "../../hooks/comments";
import { Flex } from "@chakra-ui/layout";
import { usePost } from "../../hooks/posts";
import { ShimmerPost } from "../../components/Shimmer/ShimmerPost";
import { CommentsList } from "../../components/Comments/CommentsList";
import { ShimmerComment } from "../../components/Shimmer/ShimmerComment";

const PostPage: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data, status } = usePost(postId as string);
  const {
    data: comments,
    isFetching,
    status: commentStatus,
  } = useComments(postId as string);

  if (status === "loading") {
    return <ShimmerPost />;
  }

  return (
    <Flex
      direction="column"
      width="inherit"
      alignItems="center"
      justifyItems="center"
    >
      <PostDetail detail onClick={() => {}} post={data} />
      {commentStatus === "loading" || isFetching ? (
        <ShimmerComment />
      ) : (
        <CommentsList postId={postId as string} comments={comments} />
      )}
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { postId } = ctx.params;
  const axios = getAxios();
  const queryClient = new QueryClient();
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  const cookies = cookie.parse(ctx.req.headers.cookie ?? "");
  const _cookie = cookies["uid"];

  await queryClient.prefetchQuery(["posts", postId], async () => {
    const response = await axios.get<{ data: Post }>(`posts/${postId}`, {
      withCredentials: true,
      httpsAgent,
      headers: {
        cookie: `uid=${_cookie}`,
      },
    });
    return response.data.data;
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default PostPage;
