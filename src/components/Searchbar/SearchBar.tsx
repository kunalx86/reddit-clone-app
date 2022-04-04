import { Search2Icon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Flex,
  useOutsideClick,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useSearch } from "../../hooks/search";
import { ShimmerSearch } from "../Shimmer/ShimmerSearch";
import { HistoryItems } from "./HistoryItems";
import { GroupSearch, PostSearch, UserSearch } from "./SearchItems";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const {
    query,
    handleUpdate,
    results,
    isLoading,
    isEmpty,
    historyQueryItems,
    deleteHistoryItem,
    forceWriteToStorage,
    selectQuery,
  } = useSearch();
  useOutsideClick({
    ref,
    handler: (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        forceWriteToStorage();
      }
    },
  });
  return (
    <Flex
      direction="column"
      top="2"
      transform="translateX(-50%)"
      position="fixed"
    >
      <InputGroup>
        <InputLeftAddon
          border="1px"
          borderColor="black"
          children={<Search2Icon />}
        />
        <Input
          width="100%"
          type="text"
          placeholder="Search here..."
          variant="outline"
          border="1px"
          borderColor="primaryDark"
          onClick={() => setOpen(true)}
          onChange={handleUpdate}
        />
      </InputGroup>
      {open && query && (
        <Flex
          className={styles.searchresult}
          zIndex={9}
          position="fixed"
          mt={10}
          borderRadius="md"
          shadow="md"
          border="1px"
          ref={ref}
          bgColor="white"
          width="100%"
          direction="column"
          height="350px"
          overflowY="scroll"
          overflowX="hidden"
          p={1}
        >
          <Flex direction="column" p={3}>
            <Flex width="100%" height="100%" direction="column" p={2}>
              <HistoryItems
                deleteHistoryQuery={deleteHistoryItem}
                selectQuery={selectQuery}
                queries={historyQueryItems.reverse()}
              />
            </Flex>
            <Flex width="100%" height="100%" p={2}>
              {isLoading && <ShimmerSearch />}
              {!isLoading && !isEmpty && <UserSearch users={results.data[0]} />}
            </Flex>
            <Flex width="100%" height="100%" p={2}>
              {isLoading && <ShimmerSearch />}
              {!isLoading && !isEmpty && (
                <GroupSearch groups={results.data[1]} />
              )}
            </Flex>
            <Flex width="100%" height="100%" p={2}>
              {isLoading && <ShimmerSearch />}
              {!isLoading && !isEmpty && <PostSearch posts={results.data[2]} />}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
