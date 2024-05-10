const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const http = require("http");

const DB =
  "mongodb+srv://7phussain:EeUEKS01nzYm23xe@notification.foldqjd.mongodb.net/?retryWrites=true&w=majority&appName=notification";
const server = http.createServer(app);
const port = 5000;
const { Server } = require("socket.io");
const schedule = require("node-schedule");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));
let isNotified = false;
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  let givenDate = new Date("2024-05-13"); // Your given date
  let threeDaysBefore = new Date(givenDate);
  threeDaysBefore.setDate(givenDate.getDate() - 3);
  let toDayDate = new Date();

  if (
    threeDaysBefore.toLocaleDateString() == toDayDate.toLocaleDateString() &&
    !isNotified
  )
    io.emit("update", {
      name: "I have to remind that there is only three left in offer",
    });

  isNotified = true;
});
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully Connected to Database");
  })
  .catch((err) => {
    console.log(err);
    console.log(err);
  });

//connection setup end
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
