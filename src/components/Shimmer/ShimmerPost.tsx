import { Flex, Heading, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";

export const ShimmerPost = () => (
  <Flex
    direction="column"
    borderColor="black"
    border="1px"
    rounded="md"
    width="450px"
    mb={1}
    mt={1}
    p={2}
  >
    <SkeletonCircle p={5} size="20" />
    {/* <SkeletonText noOfLines={1} /> */}
    <SkeletonText noOfLines={10} spacing="3" />
  </Flex>
);
