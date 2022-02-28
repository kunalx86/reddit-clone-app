import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Group, Post, User } from "../types";
import { useAxios } from "./axios";

interface SearchResult {
  data: [User[], Group[], Post[]];
}

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult>({
    data: [[], [], []],
  });
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxios();

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    const response = await axios.get<SearchResult>(`/search?query=${query}`, {
      withCredentials: true,
    });
    console.log(response.data);
    setIsLoading(false);
    return response.data;
  }, [query]);

  const handleUpdate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
    []
  );

  useEffect(() => {
    // TODO: Fix setting search item in localstorage after unmount
    return () => {
      localStorage.setItem("search-query", query);
    };
  }, []);

  useEffect(() => {
    if (query != "") handleSearch().then((response) => setResults(response));
    else
      setResults({
        data: [[], [], []],
      });
  }, [query]);

  return {
    query,
    handleUpdate,
    results,
    isLoading,
  };
};
