import { Container, Flex } from "@chakra-ui/layout";
import styles from "./DropDownMenu.module.css";
import NextLink from "next/link";
import { Button } from "@chakra-ui/button";
import { useAuth } from "../../hooks/auth";
import { LoginButton, LogoutButton, RegisterButton } from "./AuthButtons";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

type Props = {};

export const DropDownMenu: React.FC<Props> = () => {
  const { isLoggedIn } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      {isLoggedIn ? (
        <Flex width="inherit" direction="column">
          <Flex p={1} alignItems="center" width="inherit">
            <Container
              variant="ghost"
              alignContent="center"
              justifyContent="center"
              display={["flex", "flex", "none", "none"]}
              width="inherit"
            >
              <LogoutButton />
            </Container>
          </Flex>
          <Flex p={1} width="inherit">
            <NextLink href="/profile">
              <Container
                variant="ghost"
                alignContent="center"
                justifyContent="center"
                display="flex"
              >
                <Button variant="ghost">
                  <Flex p={2}>Profile</Flex>
                </Button>
              </Container>
            </NextLink>
          </Flex>
        </Flex>
      ) : (
        <Flex p={1} direction="column" width="inherit">
          <Container
            variant="ghost"
            alignContent="center"
            justifyContent="center"
            display={["flex", "flex", "none", "none"]}
          >
            <LoginButton />
          </Container>
          <Container
            variant="ghost"
            alignContent="center"
            justifyContent="center"
            display={["flex", "flex", "none", "none"]}
          >
            <RegisterButton />
          </Container>
        </Flex>
      )}
      <Flex p={1} width="inherit">
        <Container
          variant="ghost"
          alignContent="center"
          justifyContent="center"
          display="flex"
        >
          <Button onClick={toggleColorMode} variant="ghost">
            {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>
        </Container>
      </Flex>
    </>
  );
};
