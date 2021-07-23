import { Box } from "@chakra-ui/layout";
import { Flex, Button, Center, Spacer, IconButton } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";

type Props = {

};

const Navbar: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Box direction="row">
        <Flex alignItems="center" justifyContent="flex-start" direction="row">
          <Flex padding={2}>
            <NextLink href="/">
              <Button variant="ghost" as="a" aria-label="Home">
                Home
              </Button>
            </NextLink>
          </Flex>
          <Center width="100%">
            <Flex direction="row" justifyContent="space-between">
              {/* TODO: Insert search bar here */}
              Search
            </Flex>
          </Center>
          <Spacer />
          <Flex display={['none', 'none', 'flex', 'flex']}>
            <Flex padding={2}>
              <Button variant="ghost" as="button" aria-label="Home">
                Login
            </Button>
            </Flex>
            <Flex padding={2} mr={1}>
              <Button variant="ghost" as="button" aria-label="Home">
                Signup
            </Button>
            </Flex>
          </Flex>
          <Flex padding={2} alignItems="center" justifyContent="flex-end">
            <IconButton
              aria-label="Drop down menu"
              variant="ghost"
              icon={<ChevronDownIcon />}
            />
          </Flex>
        </Flex>
      </Box>
      {children}
    </>
  )
}

export default Navbar;