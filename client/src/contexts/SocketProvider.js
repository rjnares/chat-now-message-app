import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

import { useUser } from "./UserProvider";

const SocketContext = React.createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const user = useUser();

  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("https://chat-now-message-app.herokuapp.com", {
      query: { id: user.email },
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
