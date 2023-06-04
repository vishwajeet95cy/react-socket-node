const { Server, Socket } = require("socket.io");

const socketService = (http, app) => {
  const IO_OPTIONS = {
    cors: {
      origin: ["*"],
      methods: ["GET", "POST", "DELETE", "PATCH", "UPDATE", "OPTIONS"],
    },
    transports: ["websocket", "polling"],
  };

  const io = new Server(http, IO_OPTIONS);

  app.set("socket", io);

  io.on("connection", (socket) => {
    console.log(`A user ${socket.id} connection`);
    socket.join("global");

    socket.on("userConnect", async (data) => {
      console.log("main Data Socket", data);
      socket.join("User" + data);
      socket.emit("UserResponse", "User Connected");
    });

    socket.on("userTest", (data) => {
      console.log("main Data Socket", data);
      socket.join("User" + data);
      socket.emit("UserNotify", { data, val: "User Successfully Registed" });
    });

    socket.on("disconnect", function () {
      console.log("Socket Disconnect", socket.id);
      socket.removeAllListeners();
    });
  });
};

module.exports = socketService;
