import { SpinnerIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";
import { Container } from "../components/chakra/Container";
import { PostsPage } from "../components/Posts/PostsPage";
import { useAuth } from "../hooks/auth";
import { usePosts } from "../hooks/posts";

const Index = () => {
  const { user, isLoading, isLoggedIn } = useAuth();
  if (isLoading) {
    return (
      <Container>
        <SpinnerIcon />
      </Container>
    );
  }
  return (
    <Container height="100vh">
      <PostsPage />
    </Container>
  );
};

export default Index;
