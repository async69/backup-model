import { createContext } from "react";

export const SearchContext = createContext({
  value: "",
  setValue: () => {},
});

export const SearchProvider = SearchContext.Provider;
