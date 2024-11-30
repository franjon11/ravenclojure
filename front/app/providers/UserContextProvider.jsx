"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import useMetamask from "../utils/useMetamask";
import { AlertContext } from "./AlertContextProvider";

export const UserContext = createContext({
  userAccount: null,
  connect: () => {},
});

const UserContextProvider = ({ children }) => {
  const [userAccount, setUserAccount] = useState(null);
  const { showError } = useContext(AlertContext);
  const connect = useMetamask(setUserAccount, showError);

  useEffect(() => {
    connect();
  }, []);

  return (
    <UserContext.Provider value={{ userAccount, connect }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
