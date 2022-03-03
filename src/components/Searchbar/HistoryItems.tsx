import { CloseIcon } from "@chakra-ui/icons";
import { Flex, Spacer } from "@chakra-ui/layout";

interface HistoryItemsProps {
  queries: string[];
  selectQuery: (idx: number) => void;
  deleteHistoryQuery: (idx: number) => void;
}

export const HistoryItems: React.FC<HistoryItemsProps> = (props) => (
  <>
    {props.queries.map((query, idx) => (
      <HistoryItem key={query} query={query} idx={idx} {...props} />
    ))}
  </>
);

interface HistoryItemProps {
  query: string;
  selectQuery: (idx: number) => void;
  deleteHistoryQuery: (idx: number) => void;
  idx: number;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  query,
  selectQuery,
  deleteHistoryQuery,
  idx,
}) => (
  <Flex
    _hover={{
      backgroundColor: "gray.100",
    }}
    border="1px"
    m={1}
    p={2}
    borderRadius="md"
    direction="row"
  >
    <Flex mr="auto" onClick={() => selectQuery(idx)}>
      {query}
      <Spacer />
    </Flex>
    <CloseIcon mt="auto" mb="auto" onClick={() => deleteHistoryQuery(idx)} />
  </Flex>
);
