const io = require("socket.io")(2244, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("new user connected");
  // COLLECT USERID AND SOCKETID FROM USER
  socket.on("sendUser", (userId) => {
    addUser(userId, socket.id);
    // SEND USERS TO FE(CLIENT-SIDE)
    io.emit("getUsers", users);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    // SEND USERS TO FE(CLIENT-SIDE)
    io.emit("getUsers", users);
  });
});
