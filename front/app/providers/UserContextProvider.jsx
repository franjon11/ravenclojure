"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import useMetamask from "../utils/useMetamask";
import { AlertContext } from "./AlertContextProvider";
import useTimer from "../utils/useTimer";

export const UserContext = createContext({
  userAccount: null,
  connect: () => {},
});

const UserContextProvider = ({ children }) => {
  const [userAccount, setUserAccount] = useState(null);
  const { showError } = useContext(AlertContext);
  const connect = useMetamask(setUserAccount, showError);
  const { setRemainingTime } = useTimer(userAccount, showError);

  useEffect(() => {
    connect();

    // se llama al iniciarse
    setRemainingTime();

    // cada 2 horas (2 * 60 * 60 * 1000 ms)
    const interval = setInterval(setRemainingTime, 2 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {}, []);

  return (
    <UserContext.Provider value={{ userAccount, connect }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
