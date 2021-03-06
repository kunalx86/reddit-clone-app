import { Box } from "@chakra-ui/layout";
import {
  Flex,
  Button,
  Center,
  Spacer,
  IconButton,
  useOutsideClick,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import NextLink from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { DropDownMenu } from "./DropDownMenu";
import { useAuth } from "../../hooks/auth";
import { LoginButton, LogoutButton, RegisterButton } from "./AuthButtons";
import { SearchBar } from "../Searchbar/SearchBar";

type Props = {};

const Navbar: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const ref = useRef(null);
  useOutsideClick({
    ref,
    handler: (e) => {
      if (open && ref.current && !ref.current.contains(e.target))
        setOpen(false);
    },
  });
  return (
    <>
      <Box
        position="sticky"
        margin="0"
        top="0"
        overflow="hidden"
        width="100%"
        background="white"
        borderBottom="1px"
        borderColor="black"
        direction="row"
        shadow="md"
      >
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
              <SearchBar />
            </Flex>
          </Center>
          <Spacer />
          <Flex display={["none", "none", "flex", "flex"]}>
            {isLoggedIn ? (
              <Flex padding={2}>
                <LogoutButton />
              </Flex>
            ) : (
              <>
                <Flex padding={2}>
                  <LoginButton />
                </Flex>
                <Flex padding={2} mr={1}>
                  <RegisterButton />
                </Flex>
              </>
            )}
          </Flex>
          <Flex padding={2} alignItems="center" justifyContent="flex-end">
            <IconButton
              aria-label="Drop down menu"
              variant="ghost"
              onClick={() => setOpen(!open)}
              icon={<ChevronDownIcon />}
            />
            {open && (
              <Flex
                ref={ref}
                borderRadius="md"
                backgroundColor="white"
                position="fixed"
                top="50px"
                width="170px"
                shadow="md"
                borderColor="black"
                border="1px"
                p={2}
                direction="column"
              >
                <DropDownMenu />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>
      <Box mt="50px">{children}</Box>
    </>
  );
};

export default Navbar;
