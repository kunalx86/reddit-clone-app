import { Button } from "@chakra-ui/react";
import React from "react";
import { Container } from "../components/chakra/Container";
import { useAuth } from "../hooks/auth";
import { usePosts } from "../hooks/posts";

const Index = () => {
  const { user, isLoading, isLoggedIn } = useAuth();
  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePosts("latest");
  if (isLoading) {
    return <Container>Loading...</Container>;
  }
  return (
    <Container height="100vh">
      {isLoggedIn && user.username}
      {!isFetching &&
        data.pages.map((page) =>
          page.data.posts.map((post) => <div key={post.id}>{post.title}</div>)
        )}
      <Button
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        Load More
      </Button>
    </Container>
  );
};

export default Index;
