const http = require("http");
const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const app = express();
const socketIo = require("socket.io");

const db = require("./helpers/db");
const Chat = db.Chat;

// Middleware
app.use(cors());

// Bodyparser
app.use(express.json());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("chat", async (data) => {
    let recv = new Chat({
      classId: data.classId,
      sender_id: data.sender_id,
      sender_name: data.sender_name,
      content: data.content,
      date: Date.now(),
    });
    await recv.save();
    io.sockets.emit("inbox", recv);
  });
});

app.use("/api/user", require("./routes/user.route"));
app.use("/api/class", require("./routes/class.route"));
app.use("/api/lecture", require("./routes/lecture.route"));
app.use("/api/chat", require("./routes/chat.route"));

app.use("/static", express.static("static"));
app.use(express.static(path.join(__dirname, "client", "build")));

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server starts on port ${PORT}`));
