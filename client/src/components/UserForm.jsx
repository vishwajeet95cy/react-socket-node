import React, { useContext, useEffect, useState } from "react";
import SocketContext from "../config/socketContext";

const UserForm = () => {
  const context = useContext(SocketContext);
  const [user, setUser] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (context.socket.connected == false) {
      context.socket = context.socketAuth();
    }

    // if (context.socket.connected == true) {
    //   context.socket.emit("userConnect", "Vishwa");
    // }

    context.socket.on("connect", () => {
      console.log("Socket is connected");
      //context.socket.emit("userConnect", "Vishwa");
    });

    context.socket.on("userDisconnect", (data) => {
      // console.log('Socket Err', data)
    });

    context.socket.on("UserResponse", (data) => {
      console.log("Socket Main", data);
    });

    context.socket.on("UserNotify", (data) => {
      console.log("Socket Main", data);
      if (data.data == user) {
        setNotification(data.val);
        handleTimeOut();
      }
    });

    context.socket.on("disconnect", () => {
      // console.log('socket is disconnect')
    });

    return () => {
      context.socket.removeListener();
    };
  }, [user]);

  const handleSubmit = () => {
    if (user.length == 0) {
      alert("User Name is Required");
      return;
    }
    context.socket.emit("userTest", user);
  };

  const handleTimeOut = () => {
    setTimeout(() => {
      setNotification("");
      setUser("");
    }, 3000);
  };

  return (
    <main>
      <h2>User To Connect</h2>
      <input
        type="text"
        value={user}
        onChange={(e) => {
          setUser(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </button>
      {notification.length > 0 && (
        <>
          <h2>Notification Received</h2>
          <p>{notification}</p>
        </>
      )}
    </main>
  );
};

export default UserForm;
