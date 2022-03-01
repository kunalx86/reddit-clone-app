import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Group, Post, User } from "../types";
import { useAxios } from "./axios";

interface SearchResult {
  data: [User[], Group[], Post[]];
}

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [results, setResults] = useState<SearchResult>({
    data: [[], [], []],
  });
  const [historyQueryItems, setHistoryQueryItems] = useState<string[]>([]);
  const historyQueryItemsRef = useRef<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const queryRef = useRef<string>();
  const axios = useAxios();

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    const response = await axios.get<SearchResult>(`/search?query=${query}`, {
      withCredentials: true,
    });
    setIsLoading(false);
    return response.data;
  }, [query]);

  const handleUpdate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
    []
  );

  useEffect(() => {
    const storageItems = localStorage.getItem("search-queries");
    if (storageItems) historyQueryItemsRef.current = storageItems.split(",");
    setHistoryQueryItems(historyQueryItemsRef.current);
    return () => {
      historyQueryItemsRef.current = historyQueryItemsRef.current.filter(
        (query) => query != queryRef.current
      );
      if (queryRef.current != "")
        historyQueryItemsRef.current.push(queryRef.current);
      localStorage.setItem(
        "search-queries",
        historyQueryItemsRef.current.reduce((prev, current, idx) => {
          if (idx === 0) return `${current}`;
          return `${prev},${current}`;
        }, "")
      );
    };
  }, []);

  useEffect(() => {
    if (query != "") {
      // TODO: Debounce the following
      handleSearch().then((response) => setResults(response));
      if (isEmpty) setIsEmpty(false);
    } else {
      setResults({
        data: [[], [], []],
      });
      setIsEmpty(true);
    }
    queryRef.current = query;
  }, [query]);

  return {
    query,
    historyQueryItems,
    isEmpty,
    handleUpdate,
    results,
    isLoading,
  };
};
