import { createContext } from "react";

export const MainContext = createContext({
  value: {},
  setValue: () => {},
});

export const MainProvider = MainContext.Provider;
