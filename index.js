const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const socketService = require("./config/socketService");
const server = http.createServer(app);

app.use(cors());

app.use(express.json());

socketService(server, app);

server.listen(5001, () => {
  console.log(`Server is runnig at 5001`);
});
