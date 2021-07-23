import { Flex } from "@chakra-ui/layout";
import styles from "./DropDownMenu.module.css";
import NextLink from "next/link";
import { Button } from "@chakra-ui/button";

type Props = {

};

export const DropDownMenu:React.FC<Props> = () => {
  return (
    <Flex className={styles.dropdown} borderRadius={8} backgroundColor="white" p={2} direction="column">
      <NextLink href="/profile">
        <Button variant="ghost">
          <Flex p={2}>Profile</Flex>
        </Button>
      </NextLink>
      <Button variant="ghost" display={['flex', 'flex', 'none', 'none']}>
        <Flex p={2}>Login</Flex>
      </Button>
      <Button variant="ghost" display={['flex', 'flex', 'none', 'none']}>
        <Flex p={2}>Sign Up</Flex>
      </Button>
    </Flex>
  )
}