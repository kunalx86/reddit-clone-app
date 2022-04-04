import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useDebounce } from "rooks";
import { Group, Post, User } from "../types";
import { useAxios } from "./axios";

interface SearchResult {
  data: [User[], Group[], Post[]];
}

export const useSearch = () => {
  const [query, _setQuery] = useState("");
  const setQuery = useDebounce(_setQuery, 500);
  const [isEmpty, setIsEmpty] = useState(true);
  const [historyQueryItems, setHistoryQueryItems] = useState<string[]>([]);
  const historyQueryItemsRef = useRef<string[]>([]);
  const queryRef = useRef<string>();
  const axios = useAxios();

  const {
    data: results,
    isLoading,
    refetch,
  } = useQuery(
    "search",
    async () => {
      const response = await axios.get<SearchResult>(`/search?query=${query}`, {
        withCredentials: true,
      });
      return response.data;
    },
    {
      enabled: !!query,
    }
  );

  const handleUpdate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
    []
  );

  const deleteHistoryItem = (idx: number) => {
    setHistoryQueryItems((prev) => prev.filter((item) => item != prev[idx]));
    historyQueryItemsRef.current = historyQueryItemsRef.current.filter(
      (item) => item != historyQueryItemsRef.current[idx]
    );
  };

  const selectQuery = (idx: number) => {
    setQuery(historyQueryItems[idx]);
  };

  const forceWriteToStorage = useCallback(() => {
    setHistoryQueryItems((prev) =>
      prev.includes(query) ? [...prev] : [...prev, query]
    );
    historyQueryItemsRef.current = historyQueryItemsRef.current.filter(
      (query) => query != queryRef.current
    );
    if (queryRef.current != "")
      historyQueryItemsRef.current.push(queryRef.current);
    historyQueryItemsRef.current.length > 0
      ? localStorage.setItem(
          "search-queries",
          historyQueryItemsRef.current.reduce((prev, current, idx) => {
            if (idx === 0) return `${current}`;
            return `${prev},${current}`;
          }, "")
        )
      : localStorage.setItem("search-queries", "");
  }, [query, historyQueryItemsRef.current]);

  useEffect(() => {
    const storageItems = localStorage.getItem("search-queries");
    if (storageItems) historyQueryItemsRef.current = storageItems.split(",");
    setHistoryQueryItems(historyQueryItemsRef.current);
    return forceWriteToStorage;
  }, []);

  useEffect(() => {
    if (query != "") {
      refetch();
      if (isEmpty) setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
    queryRef.current = query;
  }, [query]);

  return {
    query,
    selectQuery,
    historyQueryItems,
    deleteHistoryItem,
    forceWriteToStorage,
    isEmpty,
    handleUpdate,
    results,
    isLoading,
  };
};
