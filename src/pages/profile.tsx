import { Center, Flex, Image, Text } from "@chakra-ui/react";
import { useAuth, useAuthRedirect } from "../hooks/auth";

const Profile = () => {
  useAuthRedirect();
  const { user } = useAuth();
  return (
    <Flex direction="column" alignContent="center" justifyContent="center">
      <Center flexDirection="column">
        <Image
          borderRadius={5}
          boxShadow="2xl"
          width={250}
          height={250}
          src={user.profile.profilePicture}
          alt={user.username}
        />
        <Text>{user.username}</Text>
      </Center>
    </Flex>
  );
};

export default Profile;
