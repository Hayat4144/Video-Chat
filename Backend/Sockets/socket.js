import { Server, Socket } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
let users = {};

io.on("connection", async (socket) => {
  // Add a user to their indiividual room
  socket.on("join", (user_id) => {
    const _userid = user_id;
    if (!users[_userid]) users[_userid] = [];
    users[_userid].push(socket.id);
    socket.join(_userid);
    io.emit("online", users);
    console.log(users);
    console.log(`indiividual user is joined thier room, ${user_id}`);
  });

  // Listen for the "online" event and emit the online status of all users, including the current user
  socket.on("online", () => {
    io.emit("online", users);
  });

  socket.on("disconnect", () => {
    const _userid = socket.user ? socket.user.id : undefined;
    if (_userid && users[_userid]) {
      const index = users[_userid].indexOf(socket.id);
      if (index > -1) {
        users[_userid] = users[_userid].filter((id) => id !== socket.id);
        io.emit("online", users);
        socket.disconnect(); // DISCONNECT SOCKET
      }
    }
  });

  // Start a new chat room and both users to it
  socket.on("StartChat", (room, callback) => {
    socket.join(room);
    console.log(`user joined the room`, room);
    callback({ data: room });
  });

  // Send and recieve message to specific chat room
  socket.on("new_message", (data) => {
    const { conversation_id, message } = data;
    console.log(message);
    io.to(conversation_id).emit("recieve_message", message);
  });

  // handling typing
  socket.on("typing", (data) => {
    socket.broadcast.emit("typingResponse", data);
  });

  // handling stoped typing
  socket.on("stopetyping", (data) => {
    console.log(data);
    socket.broadcast.emit("stopedtypingResponse", data);
  });

  socket.on("Calluser", (data) => {
    console.log("calluser", data.userToCall);
    io.to(data.userToCall).emit("incoming_call", {
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on("answer_call", (data) => {
    console.log(data.to);
    io.to(data.to).emit("callaccepted", data.signal);
  });

  socket.on("dropCall", (userid) => {
    console.log(userid);
    socket.to(userid).emit("calldroped");
  });

  socket.on("updateMyMedia", ({ type, currentMediaStatus, id }) => {
    const _userid = id;
    console.log(type, currentMediaStatus);
    socket
      .to(_userid)
      .emit("updateRemoteMedia", { type, currentMediaStatus, id });
  });
});

export default io;
