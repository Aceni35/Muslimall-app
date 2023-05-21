import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useGlobal = () => useContext(AppContext);

const context = ({ children }) => {
  return <AppContext.Provider>{children}</AppContext.Provider>;
};

export default context;
