import { Search2Icon } from "@chakra-ui/icons";
import { Flex, Spacer } from "@chakra-ui/layout";

export const HistoryItems: React.FC<{ queries: string[] }> = ({ queries }) => (
  <>
    {queries.map((query, idx) => (
      <HistoryItem key={idx} query={query} />
    ))}
  </>
);

const HistoryItem: React.FC<{ query: string }> = ({ query }) => (
  <Flex direction="row">
    {query}
    <Spacer />
    <Search2Icon />
  </Flex>
);
