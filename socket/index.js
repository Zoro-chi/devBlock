require("dotenv").config()

const io = require("socket.io")(process.env.PORT || 2244, {
  cors: {
    origin: process.env.CLIENT_URL,
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

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // LOGGING FOR CONNECTION VERIFICATION
  console.log("new user connected");

  // COLLECT USERID AND SOCKETID FROM USER
  socket.on("sendUser", (userId) => {
    addUser(userId, socket.id);
    // SEND USERS TO FE(CLIENT-SIDE)
    io.emit("getUsers", users);
  });

  // SEND AND GET MESSAGES
  socket.on("sendMsg", ({ senderId, receiverId, txt }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMsg", {
      senderId,
      txt,
    });
  });

  socket.on("disconnect", () => {
    // LOGGING FOR DIS-CONNECTION VERIFICATION
    console.log("user disconnected");
    removeUser(socket.id);
    // SEND USERS TO FE(CLIENT-SIDE)
    io.emit("getUsers", users);
  });
});
