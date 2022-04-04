import { Flex, Spinner } from "@chakra-ui/react";
import { useAuth } from "../../hooks/auth";

export const Loader: React.FC = ({ children }) => {
  const { isLoading } = useAuth();
  if (isLoading) {
    return (
      <Flex justifyContent="center">
        <Spinner />
      </Flex>
    );
  }
  return <>{children}</>;
};
