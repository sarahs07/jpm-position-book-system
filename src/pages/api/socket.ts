import { Server } from "socket.io";

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Initializing socket server");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Client connected");
      socket.on("input-change", (msg) => {
        console.log("got it");
        socket.broadcast.emit("update-input", msg);
      });

      socket.emit("update-input", ">>update-input");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }
  res.end();
}
