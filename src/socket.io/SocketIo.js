import { io } from "socket.io-client";
import staticData from "../store/staticData";

// Replace with your actual token
const token = localStorage.getItem("token");

const socket = io(staticData.SERVER_URL, {
  query: {
    authorization: token,
  },
});

const isConnected = () => {
  socket.on("connect", () => {
    console.log("Connected to the server");
  });
};

const disconnect = () => {
  socket.on("disconnect", () => {
    console.log("Disconnected from the server");
  });
};

const sendData = (sendKey, data) => {
  socket.emit(sendKey, data);
};

const receiveData = (receiveKey, callback) => {
  socket.on(receiveKey, callback);
};

export { socket, io, isConnected, disconnect, sendData, receiveData };
