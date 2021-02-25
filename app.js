const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Middleware
app.use(cors());

// Bodyparser
app.use(express.json());

app.use("/api/user", require("./routes/user.route"));
app.use("/api/class", require("./routes/class.route"));
app.use("/api/lecture", require("./routes/lecture.route"));

app.use("/static", express.static("static"));
app.use(express.static(path.join(__dirname, "client", "build")));

app.use((_req, res, _next) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

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

app.listen(PORT, console.log(`Server starts on port ${PORT}`));
