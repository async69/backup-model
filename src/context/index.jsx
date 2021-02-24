import React, { useState, useReducer } from "react";
import { SearchProvider, SearchContext } from "./Search";
import { MainContext, MainProvider } from "./Main";
import { reducer, initialState } from "./Main/reducer";

export { SearchContext };
export { MainContext };

export const ContextProvider = ({ children }) => {
  const [searchValue, setValue] = useState("");
  const [rootState, dispatch] = useReducer(reducer, initialState);
  const toggleValue = (data) => setValue(data);

  return (
    <MainProvider value={{ rootState, dispatch }}>
      <SearchProvider
        value={{
          searchValue,
          toggleValue,
        }}
      >
        {children}
      </SearchProvider>
    </MainProvider>
  );
};
