import { io } from "socket.io-client";
import { BASE_URL } from "../global";
import { useState } from "react";
import AppContext from "./AppContext";

export const socket = io(BASE_URL, {
  query: {
    token: localStorage.getItem("token"),
  },
});

const AppContextProvider = ({ children }) => {
  const [name, setname] = useState("Hayat ilyas");
  return <AppContext.Provider value={{ name }}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
