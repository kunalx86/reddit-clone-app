import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
} from "@chakra-ui/react";
import { useSearch } from "../../hooks/search";
import { GroupSearch, PostSearch, UserSearch } from "./SearchItems";

export const SearchBar = () => {
  const { query, handleUpdate, results, isLoading } = useSearch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <div>
      <InputGroup>
        <InputLeftAddon children={<SearchIcon />} />
        <Input
          width="100%"
          type="text"
          placeholder="Search here..."
          variant="outline"
          onClick={onOpen}
        />
      </InputGroup>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <InputGroup>
            <InputLeftAddon children={<SearchIcon />} />
            <Input
              width="100%"
              type="text"
              placeholder="Search here..."
              variant="outline"
              value={query}
              onChange={handleUpdate}
            />
          </InputGroup>
          <Flex direction="column" p={3}>
            {isLoading && "Loading..."}
            <Flex width="100%" height="100%" p={2}>
              {!isLoading && <UserSearch users={results.data[0]} />}
            </Flex>
            <Flex width="100%" height="100%" p={2}>
              {!isLoading && <GroupSearch groups={results.data[1]} />}
            </Flex>
            <Flex width="100%" height="100%" p={2}>
              {!isLoading && <PostSearch posts={results.data[2]} />}
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </div>
  );
};
