import React from "react";
import io from "socket.io-client";

let socket = io({ reconnectionDelayMax: 10000, autoConnect: false });

let socketAuth = () => {
  socket = io("http://localhost:5001/", {
    reconnection: false,
    transports: ["websocket", "polling"],
    upgrade: false,
  });
  return socket;
};

export { socket, socketAuth };
const SocketContext = React.createContext({ socket, socketAuth });

export default SocketContext;
