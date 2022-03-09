import { SpinnerIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { PostsList } from "../components/Posts/PostsList";
import { useAuth } from "../hooks/auth";

const Index = () => {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <SpinnerIcon />;
  }
  return (
    <Flex justifyContent="center">
      <PostsList />
    </Flex>
  );
};

export default Index;
