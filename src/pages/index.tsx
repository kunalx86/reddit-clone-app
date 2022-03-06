import { SpinnerIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { PostsPage } from "../components/Posts/PostsPage";
import { useAuth } from "../hooks/auth";

const Index = () => {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <SpinnerIcon />;
  }
  return (
    <Flex justifyContent="center">
      <PostsPage />
    </Flex>
  );
};

export default Index;
