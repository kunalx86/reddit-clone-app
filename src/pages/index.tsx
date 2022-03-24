import { SpinnerIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostForm } from "../components/Posts/PostForm";
import { PostsList } from "../components/Posts/PostsList";
import { useAuth } from "../hooks/auth";

const Index = () => {
  const { isLoading, isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  if (isLoading) {
    return <SpinnerIcon />;
  }
  return (
    <Flex
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      direction="column"
      p={4}
    >
      <Button
        disabled={!isLoggedIn}
        onClick={(_) => setIsOpen((prev) => !prev)}
        mb={2}
      >
        Create a Post!
      </Button>
      {isLoggedIn && isOpen && <PostForm />}
      <PostsList />
    </Flex>
  );
};

export default Index;
