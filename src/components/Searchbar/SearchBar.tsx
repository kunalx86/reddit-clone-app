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
import { HistoryItems } from "./HistoryItems";
import { GroupSearch, PostSearch, UserSearch } from "./SearchItems";

export const SearchBar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <div>
      <Input
        width="100%"
        type="text"
        placeholder="Search here..."
        variant="outline"
        border="1px"
        borderColor="primaryDark"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <SearchBody />
        </ModalContent>
      </Modal>
    </div>
  );
};

const SearchBody = () => {
  const {
    query,
    handleUpdate,
    results,
    isLoading,
    isEmpty,
    historyQueryItems,
    deleteHistoryItem,
    selectQuery,
  } = useSearch();
  return (
    <Flex direction="column" p={2}>
      <InputGroup>
        <InputLeftAddon
          borderColor="black"
          children={<SearchIcon borderColor="black" />}
        />
        <Input
          borderColor="black"
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
        <Flex width="100%" height="100%" direction="column" p={2}>
          <HistoryItems
            deleteHistoryQuery={deleteHistoryItem}
            selectQuery={selectQuery}
            queries={historyQueryItems.reverse()}
          />
        </Flex>
        <Flex width="100%" height="100%" p={2}>
          {!isLoading && !isEmpty && <UserSearch users={results.data[0]} />}
        </Flex>
        <Flex width="100%" height="100%" p={2}>
          {!isLoading && !isEmpty && <GroupSearch groups={results.data[1]} />}
        </Flex>
        <Flex width="100%" height="100%" p={2}>
          {!isLoading && !isEmpty && <PostSearch posts={results.data[2]} />}
        </Flex>
      </Flex>
    </Flex>
  );
};
