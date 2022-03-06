import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import cookie from "cookie";
import https from "https";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { getAxios } from "../../providers/axiosProvider";
import { Post } from "../../types";
import { PostDetail } from "../../components/Posts/PostsPage";
import { SpinnerIcon } from "@chakra-ui/icons";
import { useComments } from "../../hooks/comments";
import { Flex } from "@chakra-ui/layout";
import { usePost } from "../../hooks/posts";

const PostPage: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data, isFetching } = usePost(postId as string);
  const { data: comments } = useComments(postId as string);

  if (isFetching) return <SpinnerIcon />;

  return (
    <Flex direction="column">
      <PostDetail onClick={() => {}} post={data} />
      {comments?.length > 0 &&
        comments?.map((comment) => (
          <div key={comment.id}>{comment.comment}</div>
        ))}
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
