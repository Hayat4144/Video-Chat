import { io } from "socket.io-client";
import { BASE_URL } from "../globalConfig";
import { useState, useEffect } from "react";
import AppContext from "./AppContext";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const socket = io(BASE_URL, {
  query: {
    token: localStorage.getItem("token"),
  },
});

const AppContextProvider = ({ children }) => {
  const [name, setname] = useState("Hayat ilyas");
  const [connected, setconnected] = useState(false);
  const islogdin = JSON.parse(localStorage.getItem("islogdin"));
  const _user = JSON.parse(localStorage.getItem("user"));

  const [UserStatus, setUserStatus] = useState({ online: false });
  const { id } = useParams();

  useEffect(() => {
    if (islogdin) {
      socket.connected ? setconnected(true) : setconnected(true);
      socket.on("auth_error", (error) => {
        if (error) {
          setconnected(false);
          window.location.href = "/v5/user/signin";
        }
      });
      socket.emit("join", _user.id);
    }
    return () => {
      socket.disconnect();
      setconnected(false);
    };
  }, [islogdin]);

  //  check is user is online or not
  useEffect(() => {
    // Emit the online event to get the inital users status
    socket.emit("online");

    // listen for the onlie users and update the userstatus
    socket.on("online", (data) => {
      for (const userid in data) {
        if (data.hasOwnProperty(userid) && userid === id) {
          data[userid].length > 0
            ? setUserStatus((prevState) => ({ ...prevState, online: true }))
            : setUserStatus((prevState) => ({ ...prevState, online: false }));
          break;
        }
      }
    });
  }, [socket, id]);
  return (
    <AppContext.Provider value={{ name, connected, UserStatus }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
