import { SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";

export const ShimmerSearch = () => (
  <Flex
    direction="column"
    border="1px"
    borderRadius="md"
    width="inherit"
    mt={1}
    p={2}
  >
    <SkeletonCircle size="8" />
    <SkeletonText noOfLines={2} spacing="3" p={2} />
  </Flex>
);
