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
    <Flex
      className={styles.dropdown}
      borderRadius={8}
      backgroundColor="white"
      p={2}
      direction="column"
    >
      {isLoggedIn ? (
        <>
          <Container
            variant="ghost"
            alignContent="center"
            justifyContent="center"
            display={["flex", "flex", "none", "none"]}
          >
            <LogoutButton />
          </Container>
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
        </>
      ) : (
        <>
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
        </>
      )}
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
  );
};
